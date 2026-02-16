# Agent Pair-Programming Protocol: React Router 7 & Ox Stack

## 🧠 Hybrid Memory & Repository Hygiene

- **Static Memory:** `memory_bank.md` is the source of truth for high-level architecture, tech stack (Ox Stack/RR7), and system patterns. Update this ONLY for global changes.
- **Task Persistence:** When a feature/task is finished, create a new file in `plans/completed/<feature-name>.md`.
- **Conflict Prevention:** Never edit a file in `plans/completed/` created by another developer. Always create a NEW uniquely named file for your specific task to avoid Git merge conflicts.
- **Transient Files:** Any files in the root of `/plans/` are scratchpads. Do not expect them to exist in the next session or on another developer's machine; they are git-ignored.
- **Session Start:** At the start of a session, read `memory_bank.md` AND scan `plans/completed/` to understand the current state and recent progress.

## 🚫 Anti-Hallucination & Tooling Protocol (STRICT)

- **No Guessing:** You have a documented tendency to hallucinate package names (e.g., `@oxc-project/oxlint`). **Prohibited:** Never "invent" package names, CLI flags, or file paths.
- **No Self-Installation:** Never run `npm install` or `npx` to fetch new tools without explicit permission.
- **Cleanup Protocol:** After EVERY file modification, execute exactly: `npm run fix`.
- **Stop on Failure:** If a command fails once, **STOP.** Do not try variations or "guesses." Report the terminal output and ask for the correct project script.
- **Verify Before Thinking:** If you are unsure of a command, read `package.json` first. This is cheaper than a failed execution turn.

## 💰 Efficiency & Cost Control (Pay-As-You-Go)

- **Session Management:** Once a specific feature is verified and task summary is written to `plans/completed/`, prompt the user to "Start a New Task." This clears the expensive chat history while keeping the Memory Bank updated.
- **Three-Strike Rule:** If any command fails 3 times, **STOP.** Do not burn tokens in a loop. Ask for a hint.
- **Architect Mode:** Use for planning ONLY. Propose a plan in Markdown first. Wait for a "Go" before writing code.
- **Concision:** Do not explain basic code or add obvious comments. Skip the conversational fluff.

## 🛠️ Execution & Safety

- **Dirty Buffer Awareness:** Before writing, verify if a file has unsaved changes. **DO NOT OVERWRITE** manual edits made since your last turn. Ask to merge first.
- **Diff Preference:** Prefer applying targeted diffs/edits via the VS Code API over rewriting entire files to the filesystem.
- **Path Aliases:** Always use `~/...` aliases. Avoid relative `../` paths.

## 🚀 React Router 7 (Framework Mode)

- **Data Strategy:** Use `loader` for data fetching and `action` for mutations. Avoid `useEffect` for initial data loading.
- **Type Safety:** Use `import type { Route } from "./+types/<filename>"` for loaders, actions, and component props.
- **Type Checking:** Use `npm run typecheck` (this triggers `react-router typegen` first).
- **Form Handling:** Prioritize `<Form>` or `useFetcher` for mutations.

## 📍 Hybrid Flat-Folder Routing Strategy

- **Framework Config:** We use `flatRoutes()` from `@react-router/fs-routes`.
- **Structure:** Every route is a **folder** in `app/routes/` containing a `route.tsx` file (e.g., `app/routes/about/route.tsx`).
- **Nesting Logic:** - `_site/route.tsx` (Pathless layout)
  - `_site.about/route.tsx` (Nests under `_site`)
  - `_site._blog.blog.$slug/route.tsx` (Deep nesting)
- **Colocation:** Keep route-specific components/hooks inside the route folder. Move to `~/components` only if shared across distinct routes.
- **Route Isolation:** NEVER import from `~/routes/` in any file. If code needs to be shared, move it to `~/components` or `~/features`.

## 🏗️ Architecture & Logic

- **Module Design:** Use `const` over `let`. Use `type` over `interface`. Double quotes for strings.
- **Declarations:** Prefer `function` declarations (e.g., `export function loader`) over arrow functions (except callbacks).
- **Logic Boundaries:** Move heavy business logic to `~/services` or `~/models`. NEVER import one route module into another.
- **Type Imports:** Use `import type { ... }` for better runtime erasure.

## 🎨 Styling & UI

- **Tailwind CSS:** Use Tailwind exclusively. Prioritize semantic HTML and ARIA labels.
- **Asset Handling:** Import assets directly; do not use the `public` folder for app assets.
- **Props:** Use `Props` as the default prop type name.
