import crypto from "node:crypto";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import type { LoaderFunctionArgs } from "react-router";
import openSansRegularTtf from "../assets/fonts/open-sans-regular.ttf";
import { getValidatedBlogPostBySlug } from "../data/blog.server";

const ogWidth = 1200;
const ogHeight = 630;
const ogRenderVersion = "2026-02-14-open-sans-netlify-fallback";
const titleInset = 60;
const titlePaddingTop = 28;
const titlePaddingBottom = 32;
const maxTitleLines = 3;
const minTitleFontSize = 42;
const initialTitleFontSize = 56;
const titleFontName = "Open Sans";
const titleFontTmpPath = path.join(
  tmpdir(),
  "dice-bard-og-open-sans-regular.ttf"
);

let titleFontReadyPromise: Promise<string> | null = null;

type TitleLayout = {
  lines: string[];
  fontSize: number;
  lineHeight: number;
  lineSpacing: number;
  stripY: number;
  stripHeight: number;
  textTop: number;
  textLeft: number;
  textWidth: number;
};

function buildEtag(input: string) {
  return `"${crypto.createHash("sha256").update(input).digest("hex")}"`;
}

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

function buildTitleLayout(title: string): TitleLayout {
  const normalizedTitle = title.trim().replace(/\s+/g, " ");
  const textWidth = ogWidth - titleInset * 2;
  const words = normalizedTitle.split(" ").filter(Boolean);
  let fontSize = initialTitleFontSize;
  let titleLines: string[] = [];

  while (fontSize >= minTitleFontSize) {
    const approxCharWidth = fontSize * 0.53;
    const maxChars = Math.floor(textWidth / approxCharWidth);
    titleLines = balanceLines(words, maxTitleLines, maxChars);
    if (titleLines.length <= maxTitleLines) {
      break;
    }
    fontSize -= 4;
  }

  titleLines = titleLines.slice(0, maxTitleLines);
  const lineHeight = Math.round(fontSize * 1.15);
  const stripHeight =
    titlePaddingTop + titlePaddingBottom + lineHeight * titleLines.length;
  const stripY = ogHeight - stripHeight;
  const lineSpacing = Math.max(lineHeight - fontSize, 0);

  return {
    lines: titleLines,
    fontSize,
    lineHeight,
    lineSpacing,
    stripY,
    stripHeight,
    textTop: stripY + titlePaddingTop,
    textLeft: titleInset,
    textWidth,
  };
}

function buildOverlaySvg(stripY: number, stripHeight: number) {
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
    </svg>`
  );
}

function escapePangoText(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function fetchImageBuffer(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Response("Image Not Found", { status: 404 });
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function resolveTitleFontPath(origin: string) {
  const sourcePath = path.join(
    process.cwd(),
    "app",
    "assets",
    "fonts",
    "open-sans-regular.ttf"
  );
  if (existsSync(sourcePath)) {
    return sourcePath;
  }

  const assetPath = openSansRegularTtf.replace(/^\//, "");
  const builtClientPath = path.join(
    process.cwd(),
    "build",
    "client",
    assetPath
  );
  if (existsSync(builtClientPath)) {
    return builtClientPath;
  }

  const fontUrl = openSansRegularTtf.startsWith("http")
    ? openSansRegularTtf
    : new URL(openSansRegularTtf, origin).toString();
  const fontBuffer = await fetchImageBuffer(fontUrl);
  await writeFile(titleFontTmpPath, fontBuffer);
  return titleFontTmpPath;
}

async function ensureTitleFontFile(origin: string) {
  if (titleFontReadyPromise) {
    return titleFontReadyPromise;
  }

  titleFontReadyPromise = (async () => {
    return resolveTitleFontPath(origin);
  })();

  try {
    return await titleFontReadyPromise;
  } catch (error) {
    titleFontReadyPromise = null;
    throw error;
  }
}

async function buildTitleTextOverlay(
  titleLayout: TitleLayout,
  fontFilePath: string
) {
  const safeText = titleLayout.lines.map(escapePangoText).join("\n");
  const styledText = `<span foreground="#FDF6E3">${safeText}</span>`;
  return sharp({
    text: {
      text: styledText,
      font: `${titleFontName} ${titleLayout.fontSize}`,
      fontfile: fontFilePath,
      rgba: true,
      width: titleLayout.textWidth,
      align: "left",
      spacing: titleLayout.lineSpacing,
    },
  })
    .png()
    .toBuffer();
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const slug = params.slug ?? "";
  const post = getValidatedBlogPostBySlug(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const origin = new URL(request.url).origin;
  const imageUrl = post.imageUrl.startsWith("http")
    ? post.imageUrl
    : new URL(post.imageUrl, origin).toString();
  const etag = buildEtag(`${ogRenderVersion}|${post.title}|${imageUrl}`);

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
  const titleLayout = buildTitleLayout(post.title);
  const titleFontFilePath = await ensureTitleFontFile(origin);
  const titleOverlay = await buildTitleTextOverlay(
    titleLayout,
    titleFontFilePath
  );
  const overlaySvg = buildOverlaySvg(
    titleLayout.stripY,
    titleLayout.stripHeight
  );

  const buffer = await sharp(baseImage)
    .resize(ogWidth, ogHeight, { fit: "cover" })
    .composite([
      { input: overlaySvg, top: 0, left: 0 },
      {
        input: titleOverlay,
        top: titleLayout.textTop,
        left: titleLayout.textLeft,
      },
    ])
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
