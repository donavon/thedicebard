import { describe, expect, it } from "vitest";
import { renderXmlDocument, xml } from "~/utils/xml";

const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';

describe("xml", () => {
  it("renders a self-closing root element", () => {
    const value = renderXmlDocument(xml("root"));

    expect(value).toBe(`${xmlDeclaration}<root />`);
  });

  it("renders attributes and escapes special characters", () => {
    const value = renderXmlDocument(
      xml(
        "item",
        {
          truthy: true,
          quote: '"',
          ampersand: "&",
          apostrophe: "'",
          maybe: undefined,
        },
        undefined
      )
    );

    expect(value).toBe(
      `${xmlDeclaration}<item truthy="true" quote="&quot;" ampersand="&amp;" apostrophe="&apos;" />`
    );
  });

  it("renders nested nodes and escapes text children", () => {
    const value = renderXmlDocument(
      xml("feed", { xmlns: "http://example.com" }, [
        xml("entry", undefined, [
          xml("id", undefined, [123]),
          xml("title", { type: "text" }, [`A&B <C> "D" 'E'`]),
        ]),
      ])
    );

    expect(value).toBe(
      `${xmlDeclaration}<feed xmlns="http://example.com"><entry><id>123</id><title type="text">A&amp;B &lt;C&gt; &quot;D&quot; &apos;E&apos;</title></entry></feed>`
    );
  });

  it("filters nullish and false children but keeps empty string and zero", () => {
    const value = renderXmlDocument(
      xml("root", undefined, [
        null,
        undefined,
        false,
        "",
        0,
        xml("child", undefined, ["ok"]),
      ])
    );

    expect(value).toBe(`${xmlDeclaration}<root>0<child>ok</child></root>`);
  });
});
