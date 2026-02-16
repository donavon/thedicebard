# Memory Bank: The Dice Bard Web Application

## 📍 Active Context

Hybrid memory system initialized. Ready for new feature development.

## Project Overview

**The Dice Bard** is a professional D&D party game service operating in Essex & Passaic County, NJ. The app is built with React Router 7 (Framework Mode), featuring SSR, MDX content, and SEO-optimized town landing pages.

**Tech Stack:**

- React Router 7 (SSR) | React 19
- Tailwind CSS 4 | TypeScript (Strict)
- MDX | Zod | Vite
- Oxlint/Oxfmt | Vitest
- **Deployment:** Netlify

---

## Architecture Patterns

### 1. Hybrid Flat-Folder Routing

Uses `flatRoutes()` from `@react-router/fs-routes` with a folder-per-route structure:

- `_layout/`: Pathless layout (Consolidated CMS loader).
- `_layout.$town/`: Unified dynamic town pages (handles "home" via `home` slug).
- `_layout.$town_.$section/`: Section-specific routing.
- `_layout._blog-layout/`: Nested layout for Blog.

### 2. Content Management System (CMS)

- **MDX:** Frontmatter-driven content in `app/content/`.
- **Token System:** `{{token}}` replacement (year, siteName, town, etc.) via `replaceTokens()`.
- **Loaders:** Type-safe Zod-validated loaders in `app/content/loader.server.ts`.

### 3. Dynamic Town Pages

SEO-optimized pages for 13+ Northern NJ towns. FAQs are pseudo-randomized and personalized per town name.

### 4. Component Architecture

- **Feature-Based:** Located in `app/features/` (e.g., `home/`, `legal/`).
- **Global:** Shared UI in `app/components/` (Header, Footer, ParchmentCard).
- **Route-Specific:** Colocated in `app/routes/<route>/components/`.

### 5. Data Flow

- **Parent Loaders:** Shared data loaded in `_layout/route.tsx` and accessed via `useMatches()`.
- **Type Safety:** Strict use of `./+types/route` auto-generated types.
- **Server/Client Split:** `*.server.ts` for logic that must stay off the client.

### 6. Blog System

- MDX posts in `app/content/blog/`.
- Build-time validation (dates, image sources) in `app/utils/blog.server.ts`.
- RSS/Atom feed generation.

---

## Code Conventions (Reference AGENTS.md)

- **Module:** `const` > `let`, `type` > `interface`, double quotes.
- **Declarations:** `function` for exports.
- **Paths:** Always use `~/` aliases.
- **Style:** Tailwind CSS exclusively; semantic HTML + ARIA.
- **Cleanup:** Run `npm run fix` after every file modification.

---

## 📜 Progress History

- **2026-02-16:** Major Route Refactoring (Unified `$town` routing). See `plans/completed/2026-02-16-route-refactoring.md`.
