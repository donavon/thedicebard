import { z } from "zod";

const serviceItemSchema = z.object({
  intent: z.string().min(1),
  title: z.string().min(1),
  price: z.string().min(1),
  description: z.string().min(1),
  cta: z.string().min(1),
  highlight: z.boolean().default(false),
});

const servicesContentSchema = z
  .object({
    heading: z.string().min(1),
    subheading: z.string().min(1),
    popularBadge: z.string().min(1).default("MOST POPULAR"),
    services: z.array(serviceItemSchema).min(1),
  })
  .refine(
    (value) =>
      new Set(value.services.map((service) => service.intent)).size ===
      value.services.length,
    {
      message: "Each service intent must be unique.",
      path: ["services"],
    }
  );

const infoBenefitSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const infoSectionContentSchema = z.object({
  heading: z.string().min(1),
  intro: z.string().min(1),
  quote: z.string().min(1),
  outro: z.string().min(1),
  benefits: z.array(infoBenefitSchema).min(1),
});

const testimonialSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
});

const resourceLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

const patronPortalContentSchema = z.object({
  heading: z.string().min(1),
  testimonials: z.array(testimonialSchema).min(1),
  resourcesHeading: z.string().min(1),
  resourcesDescription: z.string().min(1),
  resources: z.array(resourceLinkSchema).min(1),
});

const aboutContentSchema = z.object({
  title: z.string().min(1).default("About the Dungeon Master"),
});

export type AboutContent = z.infer<typeof aboutContentSchema>;
export type HomeInfoSectionContent = z.infer<typeof infoSectionContentSchema>;
export type HomePatronPortalContent = z.infer<typeof patronPortalContentSchema>;
export type HomeServicesContent = z.infer<typeof servicesContentSchema>;

function formatIssuePath(path: PropertyKey[]) {
  if (path.length === 0) {
    return "frontmatter";
  }

  return path
    .map((segment) =>
      typeof segment === "number" ? `[${segment}]` : String(segment)
    )
    .join(".");
}

function parseHomeFrontmatter<T>(
  schema: z.ZodType<T>,
  frontmatter: unknown,
  sourcePath: string
) {
  const parsed = schema.safeParse(frontmatter);
  if (parsed.success) {
    return parsed.data;
  }

  const details = parsed.error.issues
    .map((issue) => `${formatIssuePath(issue.path)}: ${issue.message}`)
    .join("; ");
  throw new Error(`Invalid frontmatter in ${sourcePath}. ${details}`);
}

export function getAboutContent(frontmatter: unknown) {
  return parseHomeFrontmatter(
    aboutContentSchema,
    frontmatter,
    "app/content/about.mdx"
  );
}

export function getHomeInfoSectionContent(frontmatter: unknown) {
  return parseHomeFrontmatter(
    infoSectionContentSchema,
    frontmatter,
    "app/content/home/info-section.mdx"
  );
}

export function getHomePatronPortalContent(frontmatter: unknown) {
  return parseHomeFrontmatter(
    patronPortalContentSchema,
    frontmatter,
    "app/content/home/patron-portal.mdx"
  );
}

export function getHomeServicesContent(frontmatter: unknown) {
  return parseHomeFrontmatter(
    servicesContentSchema,
    frontmatter,
    "app/content/home/services.mdx"
  );
}
