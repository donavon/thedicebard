# Memory Bank: The Dice Bard Web Application

## Project Overview

**The Dice Bard** is a professional D&D (Dungeons & Dragons) party game service operating in Essex & Passaic County, New Jersey. The web application is built with React Router 7 in framework mode, featuring SSR, MDX-based content management, and SEO-optimized town-specific landing pages.

**Tech Stack:**

- React Router 7 (SSR enabled)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- MDX for content
- Zod for validation
- Vite for bundling
- Oxlint/Oxfmt for linting/formatting
- Vitest for testing

**Deployment:** Netlify (via `@netlify/vite-plugin-react-router`)

---

## Architecture Patterns

### 1. Hybrid Flat-Folder Routing

The project uses `flatRoutes()` from `@react-router/fs-routes` with a **folder-per-route** structure:

```
app/routes/
├── _site/                          # Pathless layout (/)
│   └── route.tsx
├── _site._blog/                    # Nested layout under _site
│   └── route.tsx
├── _site._blog.blog._index/        # /blog
├── _site._blog.blog.$slug/         # /blog/:slug
├── _site._index/                   # / (redirects to /home)
├── _site.$town/                    # /:town (dynamic town pages)
├── _site.$town_.$section/          # /:town#section (hash routing)
├── _site.about/                    # /about
├── _site.home/                     # /home
├── sitemap[.]xml/                  # /sitemap.xml
└── robots[.]txt/                   # /robots.txt
```

**Key Conventions:**

- **Dot notation** defines nesting: `_site.about` nests under `_site`
- **Underscore prefix** creates pathless layouts: `_site`, `_blog`
- **Square brackets** escape special characters: `[.]well-known.$`
- **Dollar sign** for dynamic params: `$town`, `$slug`
- **Underscore suffix** for optional params: `$town_.$section`

### 2. Content Management System (CMS)

#### MDX Content Structure

Content lives in [`app/content/`](app/content/) with frontmatter-driven configuration:

```
app/content/
├── site.mdx           # Global site config
├── about.mdx          # About section content
├── dnd-info.mdx       # D&D info section
├── services.mdx       # Services pricing/offerings
├── patrons.mdx        # Parent testimonials
├── footer.mdx         # Footer content
├── faq.md             # FAQ markdown
├── privacy.md         # Privacy policy
├── terms.md           # Terms of service
└── blog/              # Blog posts
    ├── create-your-first-character.mdx
    ├── dice-checks-and-saves.mdx
    └── ...
```

#### Token Replacement System

The CMS supports **double-braced tokens** (`{{token}}`) that are automatically expanded at load time:

**Available Tokens** (defined in [`app/content/tokens.server.ts`](app/content/tokens.server.ts:9-22)):

- `{{year}}` - Current year (dynamic)
- `{{siteName}}` - "The Dice Bard"
- `{{siteUrl}}` - "https://thedicebard.com"
- `{{ownerName}}` - "Rollick Carlberg West"
- `{{contactName}}` - "Rollick"
- `{{contactEmail}}` - "rollick@thedicebard.com"
- `{{contactPhone}}` - (optional)

**Town-Specific Tokens** (for FAQ content):

- `{{town}}` - Town name (e.g., "Montclair")
- `{{town_slug}}` - Town slug (e.g., "montclair")

**Implementation:**

- [`replaceTokens()`](app/content/tokens.server.ts:43) recursively walks objects/arrays and replaces tokens in strings
- Applied automatically via content loader functions in [`app/content/loader.server.ts`](app/content/loader.server.ts:1)

#### Content Loaders

Zod schemas validate and type all CMS content:

```typescript
// app/content/loader.server.ts
export function getSiteConfig(): SiteConfig;
export function getAboutContent(): AboutContent;
export function getServicesContent(): ServicesContent;
export function getDndInfoContent(): InfoContent;
export function getPatronsContent(): PatronsContent;
export function getFooterContent(): FooterContent;
```

All loaders (except `getSiteConfig`) apply token replacement automatically.

### 3. Dynamic Town Pages

The application generates SEO-optimized landing pages for 13+ towns in Northern NJ.

**Town Data Structure** ([`app/data/towns.tsx`](app/data/towns.tsx:10-21)):

```typescript
type TownPageData = {
  slug: string; // URL slug
  name: string; // Display name
  heroTitle: string; // Hero section title
  heroTagline: string; // Hero tagline
  metaTitle: string; // SEO title
  metaDescription: string; // SEO description
  serviceAreaCopy: string; // Service area text
  faqTitle: string; // FAQ section title
  faqItems: TownFaqItem[]; // Town-specific FAQs
  cityOptions: string[]; // Booking form cities
};
```

**Town List:**

- Default: "Northern New Jersey" (slug: `home`)
- Towns: Belleville, Bloomfield, Cedar Grove, Clifton, East Orange, Glen Ridge, Maplewood, Montclair, Nutley, Orange, South Orange, Verona, West Orange

**FAQ Personalization:**

- Base FAQs from [`app/content/faq.md`](app/content/faq.md)
- Town-specific FAQs injected dynamically
- FAQ order pseudo-randomized per town (deterministic based on town name)

**Routes:**

- [`/_site.$town/route.tsx`](app/routes/_site.$town/route.tsx:1) - Main town page
- [`/_site.$town_.$section/route.tsx`](app/routes/_site.$town_.$section/route.tsx:1) - Hash-based section routing

### 4. Component Architecture

#### Feature-Based Organization

Components are organized by feature, not by type:

```
app/features/
├── home/
│   ├── home-view.tsx              # Main composition component
│   └── components/
│       ├── about.tsx
│       ├── booking-widget.tsx
│       ├── faq.tsx
│       ├── hero/
│       │   ├── index.tsx
│       │   ├── desktop-hero.tsx
│       │   ├── mobile-hero.tsx
│       │   ├── dragon.tsx
│       │   └── hero-button.tsx
│       ├── info-section.tsx
│       ├── patron-portal.tsx
│       ├── service-area.tsx
│       └── services.tsx
└── legal/
    ├── privacy-page.tsx
    ├── terms-page.tsx
    └── components/
        └── policy-page.tsx
```

#### Global Components

Shared components live in [`app/components/`](app/components/):

- [`parchment-card.tsx`](app/components/parchment-card.tsx:1) - Themed card wrapper
- [`google-analytics.tsx`](app/components/google-analytics.tsx:1) - GA4 integration

#### Route-Specific Components

Route components are colocated with their routes:

```
app/routes/_site/components/
├── footer.tsx
├── header.tsx
└── json-ld.tsx
```

### 5. Data Flow Patterns

#### Loaders (Server-Side Data Fetching)

All data loading happens in route `loader` functions:

```typescript
// app/routes/_site.$town/route.tsx
export async function loader() {
  return {
    about: getAboutContent(),
    dndInfo: getDndInfoContent(),
    patrons: getPatronsContent(),
    services: getServicesContent(),
  };
}
```

**Key Principles:**

- Use `loader` for data fetching (NOT `useEffect`)
- Loaders run on the server during SSR
- Data is automatically serialized and hydrated
- Type-safe via `Route.ComponentProps` from `./+types/route`

#### Type Safety with Auto-Generated Types

React Router 7 generates types for each route:

```typescript
import type { Route } from "./+types/route";

export default function MyRoute({ loaderData }: Route.ComponentProps) {
  // loaderData is fully typed based on loader return
}

export const meta: MetaFunction = ({ params, data }: Route.MetaArgs) => {
  // params and data are typed
};
```

#### Utility Modules

Business logic is extracted into utility modules:

```
app/utils/
├── blog.server.ts         # Blog post validation (server-only)
├── blog.ts                # Blog utilities (client-safe)
├── blog-content.ts        # Blog MDX component mapping
├── blog-image-url.ts      # Image URL normalization
├── blog-modules.ts        # Blog module helpers
├── cn.ts                  # Tailwind class merging
├── faq.ts                 # FAQ parsing/rendering
├── feed.ts                # RSS/Atom feed helpers
├── home-content.ts        # Home content parsing
├── markdown.ts            # Markdown rendering
├── scroll.ts              # Smooth scroll utilities
├── site-time.ts           # Timezone utilities
├── town.ts                # Town lookup utilities
└── xml.ts                 # XML generation
```

**Naming Convention:**

- `*.server.ts` - Server-only code (not bundled for client)
- `*.ts` - Shared utilities (client + server)

### 6. Blog System

#### Blog Post Structure

Blog posts are MDX files in [`app/content/blog/`](app/content/blog/):

```mdx
---
slug: "create-your-first-character"
title: "How to Create Your First D&D Character"
synopsis: "A beginner's guide to character creation..."
author: "Rollick"
publishedDate: "2024-01-15"
lastModified: "2024-02-01"
imageUrl: "https://images.pexels.com/..."
imageAlt: "Dice and character sheet"
imageCreditName: "John Doe"
---

# Your content here
```

#### Blog Validation

[`app/utils/blog.server.ts`](app/utils/blog.server.ts:1) validates all blog posts at build time:

- Enforces ISO date format (`YYYY-MM-DD`)
- Validates image URLs (Pexels/Unsplash only)
- Ensures slug matches filename
- Sorts posts by `publishedDate` (descending)

#### Blog Routes

- [`/_site._blog.blog._index/route.tsx`](app/routes/_site._blog.blog._index/route.tsx:1) - Blog listing
- [`/_site._blog.blog.$slug/route.tsx`](app/routes/_site._blog.blog.$slug/route.tsx:1) - Individual post

#### Blog Feeds

- [`/rss.xml`](app/routes/rss[.]xml/route.ts:1) - RSS 2.0 feed
- [`/atom.xml`](app/routes/atom[.]xml/route.ts:1) - Atom feed

### 7. SEO & Structured Data

#### Meta Tags

Meta tags are defined via `meta` exports:

```typescript
export const meta: MetaFunction = ({ params }) => {
  const town = getTownBySlug(params.town ?? "home");
  return [
    { title: town.metaTitle },
    { name: "description", content: town.metaDescription },
  ];
};
```

#### JSON-LD Structured Data

[`app/routes/_site/components/json-ld.tsx`](app/routes/_site/components/json-ld.tsx:1) generates LocalBusiness schema:

- Organization info
- Service area (all towns)
- Contact information
- Social profiles

Blog posts have dedicated JSON-LD via [`blog-post-json-ld.tsx`](app/routes/_site._blog.blog.$slug/components/blog-post-json-ld.tsx:1).

#### Sitemap & Robots

- [`/sitemap.xml`](app/routes/sitemap[.]xml/route.ts:1) - Dynamic sitemap (all towns + blog posts)
- [`/robots.txt`](app/routes/robots[.]txt/route.ts:1) - Robots directives

---

## Styling System

### Tailwind CSS 4

The project uses Tailwind CSS 4 with Vite plugin:

```typescript
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};
```

### Custom Theme

Custom colors and utilities are defined in [`app/app.css`](app/app.css):

- Parchment texture background
- Custom color palette (browns, golds)
- Typography scale
- Responsive breakpoints

### Class Name Utility

[`app/utils/cn.ts`](app/utils/cn.ts:3) provides a simple class merging utility:

```typescript
export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(" ");
}
```

---

## Code Conventions (from AGENTS.md)

### Module Design

- Use `const` over `let`
- Use `type` over `interface`
- Use double quotes for strings
- Prefer `function` declarations over arrow functions (except callbacks)
- Use `~/...` path aliases (never `../`)

### React Router 7 Patterns

- Use `loader` for data fetching (not `useEffect`)
- Use `action` for mutations
- Use `<Form>` or `useFetcher` for forms
- Import types: `import type { Route } from "./+types/<filename>"`

### Component Conventions

- Default prop type name: `Props` (unless exported)
- Semantic HTML + ARIA labels
- Tailwind CSS exclusively (no CSS modules)

### File Restrictions

- Route-specific logic stays in route folders
- NEVER import one route module into another
- Heavy business logic goes in `~/services` or `~/models`
- Colocation: Keep route-specific components in route folders

### Linting & Formatting

After EVERY file modification:

```bash
npx ox fmt .
npx ox lint --fix .
```

---

## Key Files Reference

### Configuration

- [`package.json`](package.json:1) - Dependencies and scripts
- [`react-router.config.ts`](react-router.config.ts:1) - React Router config (SSR enabled)
- [`vite.config.ts`](vite.config.ts) - Vite bundler config
- [`tsconfig.json`](tsconfig.json) - TypeScript config
- [`.oxlintrc.json`](.oxlintrc.json) - Oxlint rules
- [`.oxfmtrc.json`](.oxfmtrc.json) - Oxfmt formatting rules
- [`netlify.toml`](netlify.toml) - Netlify deployment config

### Core Application

- [`app/root.tsx`](app/root.tsx:1) - Root layout with GA, meta, error boundary
- [`app/routes.ts`](app/routes.ts:1) - Route configuration (uses `flatRoutes()`)
- [`app/app.css`](app/app.css) - Global styles and Tailwind config

### Data & Content

- [`app/data/site.ts`](app/data/site.ts:1) - Site-wide constants
- [`app/data/towns.tsx`](app/data/towns.tsx:1) - Town page data
- [`app/content/loader.server.ts`](app/content/loader.server.ts:1) - CMS content loaders
- [`app/content/tokens.server.ts`](app/content/tokens.server.ts:1) - Token replacement system

### Utilities

- [`app/utils/blog.server.ts`](app/utils/blog.server.ts:1) - Blog validation (server)
- [`app/utils/town.ts`](app/utils/town.ts:1) - Town lookup utilities
- [`app/utils/faq.ts`](app/utils/faq.ts:1) - FAQ parsing
- [`app/utils/markdown.ts`](app/utils/markdown.ts:1) - Markdown rendering
- [`app/utils/xml.ts`](app/utils/xml.ts:1) - XML generation for feeds

---

## Development Workflow

### Local Development

```bash
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Production build
npm run start            # Preview production build
npm run lint             # Run oxlint
npm run format           # Format with oxfmt
npm run typecheck        # TypeScript type checking
npm run test             # Run tests
npm run ci               # Full CI pipeline
```

### Build Process

1. `write-build-time.mjs` - Generates [`app/data/build-time.ts`](app/data/build-time.ts:1)
2. `react-router build` - Builds client + server bundles
3. Output: `build/client/` (static) + `build/server/` (SSR)

### Deployment

Netlify automatically:

1. Runs `npm run build`
2. Deploys `build/client/` as static assets
3. Deploys `build/server/` as serverless functions

---

## Common Patterns & Examples

### Adding a New Route

1. Create folder: `app/routes/_site.newpage/`
2. Add `route.tsx`:

```typescript
import type { Route } from "./+types/route";

export async function loader() {
  return { data: "example" };
}

export default function NewPageRoute({ loaderData }: Route.ComponentProps) {
  return <div>{loaderData.data}</div>;
}

export function meta() {
  return [{ title: "New Page" }];
}
```

### Adding CMS Content

1. Create MDX file: `app/content/newcontent.mdx`
2. Add frontmatter with Zod schema in [`loader.server.ts`](app/content/loader.server.ts:1)
3. Create loader function with token replacement
4. Import in route loader

### Adding a New Town

Towns are auto-generated from [`defaultCityOptions`](app/data/towns.tsx:25-39). To add a town:

1. Add to `defaultCityOptions` array
2. Rebuild - town page is auto-generated

### Adding a Blog Post

1. Create `app/content/blog/my-post.mdx`
2. Add required frontmatter (slug, title, synopsis, etc.)
3. Validation happens automatically at build time
4. Post appears in blog feed and sitemap

---

## Testing Strategy

- **Unit Tests:** Vitest for utilities ([`app/utils/*.test.ts`](app/utils/))
- **Type Safety:** TypeScript strict mode + React Router type generation
- **Validation:** Zod schemas for all CMS content
- **Linting:** Oxlint with strict rules
- **Build-Time Checks:** Blog validation, slug matching, date formats

---

## Performance Optimizations

1. **SSR:** Server-side rendering for fast initial load
2. **Asset Fingerprinting:** Import assets directly (not `public/`)
3. **Image Optimization:** Sharp for image processing
4. **Code Splitting:** Automatic via Vite
5. **Lazy Loading:** Route-based code splitting
6. **Static Generation:** Pre-rendered routes where possible

---

## Security Considerations

1. **Image URLs:** Validated to Pexels/Unsplash only
2. **Content Validation:** Zod schemas prevent malformed data
3. **Server-Only Code:** `.server.ts` files never bundled for client
4. **Type Safety:** TypeScript prevents runtime errors
5. **Sanitization:** Markdown rendered safely via micromark

---

## Future Considerations

### Potential Enhancements

1. **CMS Integration:** Consider Sanity/Contentful for non-technical editors
2. **Booking System:** Integrate Calendly/Acuity API
3. **Payment Processing:** Stripe integration for deposits
4. **Email Automation:** SendGrid/Mailgun for confirmations
5. **Analytics Dashboard:** Custom analytics beyond GA4
6. **A/B Testing:** Experiment framework for conversion optimization
7. **Progressive Web App:** Service worker for offline support

### Scalability Notes

- Current architecture supports 100+ towns without performance issues
- Blog system scales to 1000+ posts
- Consider CDN (Cloudflare) for high traffic
- Database integration needed for user accounts/bookings

---

## Troubleshooting

### Common Issues

**Build Fails:**

- Check blog post frontmatter validation
- Ensure all MDX files have valid frontmatter
- Run `npm run typecheck` for type errors

**Routing Issues:**

- Verify folder naming follows flat-routes conventions
- Check for conflicting route patterns
- Review [`app/routes.ts`](app/routes.ts:1) output

**Token Replacement Not Working:**

- Ensure tokens are wrapped in double braces: `{{token}}`
- Check token is defined in [`tokens.server.ts`](app/content/tokens.server.ts:9-22)
- Verify content loader applies `replaceTokens()`

**Styling Issues:**

- Run `npx ox fmt .` to fix formatting
- Check Tailwind class names are valid
- Verify custom theme in [`app.css`](app/app.css)

---

## Contact & Ownership

**Project Owner:** Rollick Carlberg West  
**Business:** The Dice Bard  
**Email:** rollick@thedicebard.com  
**Website:** https://thedicebard.com  
**Service Area:** Essex & Passaic County, NJ

---

_Last Updated: 2026-02-15_
