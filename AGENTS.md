# Agent Pair-Programming Protocol

## 🛠️ Execution & Safety

- **Dirty Buffer Awareness:** Before writing to any file, verify if it has unsaved changes in the editor. If I have made manual edits since your last turn, **DO NOT OVERWRITE THEM.** Ask me to merge or save first.
- **Auto-Format & Lint:** I use `ox` for extreme speed. After EVERY file modification, you MUST execute `npx ox fmt .` and `npx ox lint --fix .` in the terminal.
- **Diff Preference:** Prefer applying targeted diffs/edits via the VS Code API over rewriting entire files to the filesystem. This prevents save conflicts.

## 🚀 React Router 7 (Framework Mode)

- **Data Strategy:** Use `loader` for data fetching and `action` for mutations. Avoid `useEffect` for initial data loading.
- **Type Safety:** Use `import type { Route } from "./+types/<filename>"` for loaders, actions, and component props to leverage RR7's auto-generated types.
- **Form Handling:** Prioritize the `<Form>` component or `useFetcher` for mutations to leverage progressive enhancement.

## 📍 Hybrid Flat-Folder Routing Strategy

- **Framework Config:** We use `flatRoutes()` from `@react-router/fs-routes`.
- **Structure:** Every route is a **folder** in `app/routes/` named after its URL segment, containing a `route.tsx` file (e.g., `app/routes/about/route.tsx`).
- **Nesting Logic (Dots):** - Use dot-notation in folder names to define nesting.
  - `_site/route.tsx` is a pathless layout.
  - `_site.about/route.tsx` nests under the `_site` layout.
  - `_site._blog/route.tsx` is a nested layout under `_site`.
  - `_site._blog.blog.$slug/route.tsx` nests inside BOTH `_site` and `_blog`.
- **Colocation:** Keep route-specific components, hooks, and utils inside the route's folder. Only move to global `~/components` if shared across multiple distinct routes.

## 🏗️ Architecture & Logic

- **Module Design:** Use `const` over `let`. Use `type` over `interface`. Use double quotes for strings.
- **Declarations:** Prefer `function` declarations (e.g., `export function loader`) over arrow functions (except for callbacks).
- **Path Aliases:** Always use `~/...` aliases. Avoid relative `../` paths.
- **Logic Boundaries:** Move heavy business logic out of route loaders into `~/services` or `~/models`. NEVER import one route module into another.
- **Type Imports:** Use `import type { ... }` for better runtime erasure.

## 🎨 Styling & UI

- **Tailwind CSS:** Use Tailwind exclusively. Prioritize semantic HTML and ARIA labels.
- **Asset Handling:** Import assets directly; do not use the `public` folder for app assets to ensure fingerprinting.
- **Props:** Use `Props` as the default prop type name unless exported outside the file.

## 💰 Efficiency & Cost Control (Pay-As-You-Go)

- **Inventory Check:** Before creating a new component, search `~/components` for existing primitives.
- **Selective Context:** Do not read `node_modules` or `dist`. Only read files directly relevant to the current task.
- **Three-Strike Rule:** If `ox lint` or a terminal command fails 3 times, **STOP.** Do not burn tokens in a loop. Ask me for a hint.
- **Architect Mode:** For complex tasks, propose a plan in Markdown first. Wait for my "Go" before writing code.
- **Concision:** Do not explain basic code or add obvious comments.
