import { describe, expect, it } from "vitest";
import {
  getBlogImageSourceUrl,
  normalizeBlogImageUrl,
  normalizeBlogImageUrlForDpr,
} from "./blog-image-url";

function getUrl(value: string) {
  return new URL(value);
}

describe("normalizeBlogImageUrl", () => {
  it("returns local image paths unchanged", () => {
    expect(normalizeBlogImageUrl("/blog/stranger-things.webp", "post")).toBe(
      "/blog/stranger-things.webp"
    );
  });

  it("converts an Unsplash page URL to id-based download URL with card params", () => {
    const value = normalizeBlogImageUrl(
      "https://unsplash.com/photos/black-dice-on-white-table-Sv3DXPITy0U",
      "cardMobile"
    );
    const url = getUrl(value);

    expect(url.origin).toBe("https://unsplash.com");
    expect(url.pathname).toBe("/photos/Sv3DXPITy0U/download");
    expect(url.searchParams.get("force")).toBe("true");
    expect(url.searchParams.get("auto")).toBe("compress,format");
    expect(url.searchParams.get("fit")).toBe("crop");
    expect(url.searchParams.get("crop")).toBe("faces,entropy");
    expect(url.searchParams.get("w")).toBe("640");
    expect(url.searchParams.get("h")).toBe("344");
    expect(url.searchParams.get("dpr")).toBe("2");
    expect(url.searchParams.get("q")).toBe("75");
  });

  it("adds transform params to direct Unsplash image URLs", () => {
    const value = normalizeBlogImageUrl(
      "https://images.unsplash.com/photo-123?existing=true",
      "post"
    );
    const url = getUrl(value);

    expect(url.origin).toBe("https://images.unsplash.com");
    expect(url.pathname).toBe("/photo-123");
    expect(url.searchParams.get("force")).toBeNull();
    expect(url.searchParams.get("auto")).toBe("compress,format");
    expect(url.searchParams.get("fit")).toBe("crop");
    expect(url.searchParams.get("crop")).toBe("faces,entropy");
    expect(url.searchParams.get("w")).toBe("766");
    expect(url.searchParams.get("h")).toBe("430");
  });

  it("converts a Pexels page URL to images endpoint with params", () => {
    const value = normalizeBlogImageUrl(
      "https://www.pexels.com/photo/different-tabletop-dice-11236300/",
      "post"
    );
    const url = getUrl(value);

    expect(url.origin).toBe("https://images.pexels.com");
    expect(url.pathname).toBe("/photos/11236300/pexels-photo-11236300.jpeg");
    expect(url.searchParams.get("auto")).toBe("compress,format");
    expect(url.searchParams.get("fit")).toBe("crop");
    expect(url.searchParams.get("crop")).toBe("faces,entropy");
    expect(url.searchParams.get("w")).toBe("766");
    expect(url.searchParams.get("h")).toBe("430");
    expect(url.searchParams.get("dpr")).toBe("2");
    expect(url.searchParams.get("q")).toBe("75");
  });

  it("uses png output mode for og variant", () => {
    const value = normalizeBlogImageUrl(
      "https://unsplash.com/photos/black-dice-on-white-table-Sv3DXPITy0U",
      "og"
    );
    const url = getUrl(value);

    expect(url.searchParams.get("fm")).toBe("png");
    expect(url.searchParams.get("auto")).toBeNull();
    expect(url.searchParams.get("w")).toBe("1200");
    expect(url.searchParams.get("h")).toBe("630");
    expect(url.searchParams.get("dpr")).toBe("1");
    expect(url.searchParams.get("q")).toBe("80");
  });

  it("handles hyphenated unsplash photo ids in page URLs", () => {
    const value = normalizeBlogImageUrl(
      "https://unsplash.com/photos/red-dragon-action-figure-on-table-X-A-LJVAhzk",
      "cardMobile"
    );
    const url = getUrl(value);

    expect(url.origin).toBe("https://unsplash.com");
    expect(url.pathname).toBe("/photos/X-A-LJVAhzk/download");
    expect(url.searchParams.get("force")).toBe("true");
    expect(url.searchParams.get("w")).toBe("640");
    expect(url.searchParams.get("h")).toBe("344");
  });
});

describe("normalizeBlogImageUrlForDpr", () => {
  it("overrides dpr in srcset variants", () => {
    const value = normalizeBlogImageUrlForDpr(
      "https://www.pexels.com/photo/different-tabletop-dice-11236300/",
      "cardDesktop",
      1
    );
    const url = getUrl(value);

    expect(url.searchParams.get("w")).toBe("357");
    expect(url.searchParams.get("h")).toBe("192");
    expect(url.searchParams.get("dpr")).toBe("1");
  });
});

describe("getBlogImageSourceUrl", () => {
  it("resolves a pexels images URL to a pexels photo page URL", () => {
    expect(
      getBlogImageSourceUrl(
        "https://images.pexels.com/photos/11236300/pexels-photo-11236300.jpeg?auto=compress,format&w=766"
      )
    ).toBe("https://www.pexels.com/photo/11236300/");
  });

  it("keeps pexels page URL source links", () => {
    expect(
      getBlogImageSourceUrl(
        "https://www.pexels.com/photo/different-tabletop-dice-11236300/"
      )
    ).toBe("https://www.pexels.com/photo/different-tabletop-dice-11236300");
  });

  it("resolves unsplash page and download URLs to the photo page", () => {
    expect(
      getBlogImageSourceUrl(
        "https://unsplash.com/photos/black-dice-on-white-table-Sv3DXPITy0U"
      )
    ).toBe("https://unsplash.com/photos/black-dice-on-white-table-Sv3DXPITy0U");

    expect(
      getBlogImageSourceUrl(
        "https://unsplash.com/photos/Sv3DXPITy0U/download?force=true"
      )
    ).toBe("https://unsplash.com/photos/Sv3DXPITy0U");
  });
});
