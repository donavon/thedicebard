import crypto from "node:crypto";
import sharp from "sharp";
import type { LoaderFunctionArgs } from "react-router";
import { getBlogPostBySlug } from "../data/blog";

const ogWidth = 1200;
const ogHeight = 630;

function buildEtag(input: string) {
  return `"${crypto.createHash("sha256").update(input).digest("hex")}"`;
}

function buildTitleSvg(title: string) {
  const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const maxWidth = ogWidth - 120;
  const maxLines = 3;
  const minFontSize = 42;
  let fontSize = 56;
  let titleLines: string[] = [];

  function balanceLines(words: string[], lineCount: number, maxChars: number) {
    const n = words.length;
    const dp: Array<Array<{ cost: number; prev: number }>> = Array.from(
      { length: lineCount + 1 },
      () =>
        Array.from({ length: n + 1 }, () => ({
          cost: Number.POSITIVE_INFINITY,
          prev: -1,
        }))
    );
    dp[0][0] = { cost: 0, prev: -1 };

    const wordLengths = words.map((word) => word.length);
    const prefix = [0];
    for (let i = 0; i < wordLengths.length; i += 1) {
      prefix.push(prefix[i] + wordLengths[i]);
    }

    function lineLength(start: number, end: number) {
      const wordsLength = prefix[end] - prefix[start];
      const spaces = end - start - 1;
      return wordsLength + Math.max(spaces, 0);
    }

    for (let line = 1; line <= lineCount; line += 1) {
      for (let i = 1; i <= n; i += 1) {
        for (let k = 0; k < i; k += 1) {
          const length = lineLength(k, i);
          if (length > maxChars) {
            continue;
          }
          const diff = maxChars - length;
          const cost = dp[line - 1][k].cost + diff * diff;
          if (cost < dp[line][i].cost) {
            dp[line][i] = { cost, prev: k };
          }
        }
      }
    }

    let bestLineCount = lineCount;
    for (let lines = 1; lines <= lineCount; lines += 1) {
      if (dp[lines][n].cost < Number.POSITIVE_INFINITY) {
        bestLineCount = lines;
        break;
      }
    }

    const result: string[] = [];
    let idx = n;
    for (let line = bestLineCount; line > 0; line -= 1) {
      const prev = dp[line][idx].prev;
      if (prev < 0) {
        break;
      }
      result.unshift(words.slice(prev, idx).join(" "));
      idx = prev;
    }
    if (result.length === 0) {
      return [words.join(" ")];
    }
    return result;
  }

  while (fontSize >= minFontSize) {
    const approxCharWidth = fontSize * 0.58;
    const maxChars = Math.floor(maxWidth / approxCharWidth);
    const words = safeTitle.split(" ");
    titleLines = balanceLines(words, maxLines, maxChars);
    if (titleLines.length <= maxLines) {
      break;
    }
    fontSize -= 4;
  }

  titleLines = titleLines.slice(0, maxLines);
  const lineHeight = Math.round(fontSize * 1.15);
  const paddingTop = 28;
  const paddingBottom = 32;
  const stripHeight =
    paddingTop + paddingBottom + lineHeight * titleLines.length;
  const stripY = ogHeight - stripHeight;
  const startY = stripY + paddingTop + fontSize;

  const tspans = titleLines
    .map(
      (line, index) =>
        `<tspan x="60" y="${startY + index * lineHeight}">${line}</tspan>`
    )
    .join("");

  return Buffer.from(
    `<svg width="${ogWidth}" height="${ogHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(0,0,0,0)" />
          <stop offset="60%" stop-color="rgba(0,0,0,0.15)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.65)" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#fade)" />
      <rect x="0" y="${stripY}" width="100%" height="${stripHeight}" fill="rgba(0,0,0,0.55)" />
      <text font-size="${fontSize}" font-family="Arial, Helvetica, sans-serif" fill="#FDF6E3">
        ${tspans}
      </text>
    </svg>`
  );
}

async function fetchImageBuffer(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Response("Image Not Found", { status: 404 });
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const slug = params.slug ?? "";
  const post = getBlogPostBySlug(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const origin = new URL(request.url).origin;
  const imageUrl = post.imageUrl.startsWith("http")
    ? post.imageUrl
    : new URL(post.imageUrl, origin).toString();
  const etag = buildEtag(`${post.title}|${imageUrl}`);

  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, {
      status: 304,
      headers: {
        ETag: etag,
        "Cache-Control": "public, max-age=0, s-maxage=31536000",
      },
    });
  }

  const baseImage = await fetchImageBuffer(imageUrl);
  const titleSvg = buildTitleSvg(post.title);

  const buffer = await sharp(baseImage)
    .resize(ogWidth, ogHeight, { fit: "cover" })
    .composite([{ input: titleSvg, top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toBuffer();

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=0, s-maxage=31536000",
      ETag: etag,
    },
  });
}
