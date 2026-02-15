type BlogImageVariant = "cardDesktop" | "cardMobile" | "post" | "og";
type BlogImageProvider = "pexels" | "unsplash";

type BlogImageVariantParams = {
  dpr: string;
  h: string;
  q: string;
  w: string;
};

const blogImageVariantParamsByVariant: Record<
  BlogImageVariant,
  BlogImageVariantParams
> = {
  cardDesktop: { w: "357", h: "192", dpr: "2", q: "75" },
  cardMobile: { w: "640", h: "344", dpr: "2", q: "75" },
  post: { w: "766", h: "430", dpr: "2", q: "75" },
  og: { w: "1200", h: "630", dpr: "1", q: "80" },
};

function getBlogImageProvider(hostname: string): BlogImageProvider | null {
  if (hostname === "images.pexels.com" || hostname.endsWith(".pexels.com")) {
    return "pexels";
  }

  if (
    hostname === "images.unsplash.com" ||
    hostname === "unsplash.com" ||
    hostname === "www.unsplash.com"
  ) {
    return "unsplash";
  }

  return null;
}

function getPexelsImageUrl(url: URL) {
  if (url.hostname === "images.pexels.com") {
    return new URL(url.toString());
  }

  const idMatch = /(\d+)(?:\/)?$/.exec(url.pathname);
  if (!idMatch) {
    return null;
  }

  const [, imageId] = idMatch;
  return new URL(
    `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg`
  );
}

function getUnsplashImageUrl(url: URL) {
  if (url.hostname === "images.unsplash.com") {
    return new URL(url.toString());
  }

  function getUnsplashPhotoId(photoSlugOrId: string) {
    if (/^[A-Za-z0-9_-]{11}$/.test(photoSlugOrId)) {
      return photoSlugOrId;
    }

    const match = /-([A-Za-z0-9_-]{11})$/.exec(photoSlugOrId);
    if (!match) {
      return null;
    }

    return match[1];
  }

  const trimmedPath = url.pathname.replace(/\/$/, "");
  if (trimmedPath.startsWith("/photos/")) {
    const pathParts = trimmedPath.split("/").filter(Boolean);
    const photoSlugOrId = pathParts[1];
    if (!photoSlugOrId) {
      return null;
    }

    const photoId = getUnsplashPhotoId(photoSlugOrId);
    if (!photoId) {
      return null;
    }

    const downloadUrl = new URL(
      `https://unsplash.com/photos/${photoId}/download`
    );
    for (const [key, value] of url.searchParams.entries()) {
      downloadUrl.searchParams.set(key, value);
    }
    downloadUrl.searchParams.set("force", "true");
    return downloadUrl;
  }

  if (!trimmedPath.startsWith("/photo-")) {
    return null;
  }

  const photoUrl = new URL(url.toString());
  photoUrl.searchParams.set("force", "true");
  return photoUrl;
}

function getProviderImageUrl(url: URL, provider: BlogImageProvider) {
  if (provider === "pexels") {
    return getPexelsImageUrl(url);
  }

  return getUnsplashImageUrl(url);
}

function applyBlogImageParams(
  url: URL,
  variant: BlogImageVariant,
  options: {
    dprOverride?: 1 | 2;
    provider: BlogImageProvider;
  }
) {
  const { dprOverride, provider } = options;
  const variantParams = blogImageVariantParamsByVariant[variant];
  const dpr = dprOverride ? String(dprOverride) : variantParams.dpr;
  const isUnsplashDownloadEndpoint =
    provider === "unsplash" && url.hostname !== "images.unsplash.com";

  url.search = "";

  if (isUnsplashDownloadEndpoint) {
    url.searchParams.set("force", "true");
  }

  if (variant === "og") {
    url.searchParams.set("fm", "png");
  } else {
    url.searchParams.set("auto", "compress,format");
  }

  url.searchParams.set("fit", "crop");
  url.searchParams.set("crop", "faces,entropy");
  url.searchParams.set("w", variantParams.w);
  url.searchParams.set("h", variantParams.h);
  url.searchParams.set("dpr", dpr);
  url.searchParams.set("q", variantParams.q);
  return url.toString();
}

function normalizeExternalBlogImageUrl(
  imageUrl: string,
  variant: BlogImageVariant
) {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return null;
  }

  const provider = getBlogImageProvider(parsedUrl.hostname);
  if (!provider) {
    return null;
  }

  const providerImageUrl = getProviderImageUrl(parsedUrl, provider);
  if (!providerImageUrl) {
    return null;
  }

  return applyBlogImageParams(providerImageUrl, variant, { provider });
}

function normalizeBlogImageUrlForDpr(
  imageUrl: string,
  variant: BlogImageVariant,
  dpr: 1 | 2
) {
  const normalizedUrlString = normalizeExternalBlogImageUrl(imageUrl, variant);
  if (!normalizedUrlString) {
    return imageUrl;
  }

  const normalizedUrl = new URL(normalizedUrlString);
  const provider = getBlogImageProvider(normalizedUrl.hostname);
  if (!provider) {
    return normalizedUrlString;
  }

  return applyBlogImageParams(normalizedUrl, variant, {
    dprOverride: dpr,
    provider,
  });
}

function normalizeBlogImageUrl(imageUrl: string, variant: BlogImageVariant) {
  const normalizedUrl = normalizeExternalBlogImageUrl(imageUrl, variant);
  if (!normalizedUrl) {
    return imageUrl;
  }

  return normalizedUrl;
}

function getBlogImageSourceUrl(imageUrl: string) {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return imageUrl;
  }

  const provider = getBlogImageProvider(parsedUrl.hostname);
  if (!provider) {
    return imageUrl;
  }

  if (provider === "unsplash") {
    const trimmedPath = parsedUrl.pathname.replace(/\/$/, "");
    if (trimmedPath.startsWith("/photos/")) {
      const pathParts = trimmedPath.split("/").filter(Boolean);
      const photoSlugOrId = pathParts[1];
      if (!photoSlugOrId) {
        return "https://unsplash.com";
      }
      return `https://unsplash.com/photos/${photoSlugOrId}`;
    }

    if (trimmedPath.startsWith("/photo-")) {
      return `https://unsplash.com${trimmedPath}`;
    }

    return "https://unsplash.com";
  }

  if (parsedUrl.hostname !== "images.pexels.com") {
    const trimmedPath = parsedUrl.pathname.replace(/\/$/, "");
    return `https://www.pexels.com${trimmedPath}`;
  }

  const idMatch = /\/photos\/(\d+)\//.exec(parsedUrl.pathname);

  if (!idMatch) {
    return "https://www.pexels.com";
  }

  const [, imageId] = idMatch;
  return `https://www.pexels.com/photo/${imageId}/`;
}

export {
  getBlogImageSourceUrl,
  normalizeBlogImageUrl,
  normalizeBlogImageUrlForDpr,
};
export type { BlogImageVariant };
