type XmlAttributeValue = string | number | boolean;

type XmlAttributes = Record<string, XmlAttributeValue | undefined>;

export type XmlChild =
  | XmlElementNode
  | string
  | number
  | null
  | undefined
  | false;

export type XmlElementNode = {
  attrs?: XmlAttributes;
  children?: XmlChild[];
  name: string;
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function xml(
  name: string,
  attrs?: XmlAttributes,
  children?: XmlChild[]
): XmlElementNode {
  return { name, attrs, children } satisfies XmlElementNode;
}

function isPresentXmlChild(
  child: XmlChild
): child is Exclude<XmlChild, null | undefined | false> {
  return child !== null && child !== undefined && child !== false;
}

function renderXml(node: XmlElementNode): string {
  const attrs = Object.entries(node.attrs ?? {})
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}="${escapeXml(String(value))}"`)
    .join(" ");
  const openTag =
    attrs.length > 0 ? `<${node.name} ${attrs}>` : `<${node.name}>`;
  const filteredChildren = (node.children ?? []).filter(isPresentXmlChild);

  if (filteredChildren.length === 0) {
    return attrs.length > 0 ? `<${node.name} ${attrs} />` : `<${node.name} />`;
  }

  const content = filteredChildren
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return escapeXml(String(child));
      }

      return renderXml(child);
    })
    .join("");

  return `${openTag}${content}</${node.name}>`;
}

export function renderXmlDocument(root: XmlElementNode) {
  return `<?xml version="1.0" encoding="UTF-8"?>${renderXml(root)}`;
}
