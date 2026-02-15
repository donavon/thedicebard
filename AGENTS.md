# Agent Guidelines

## General

- Use `const` instead of `let` whenever possible.
- Prefer named exports. Use `export default` only when required for routing.
- Keep modules small and single-purpose.
- Prefer function declarations over arrow functions, except for callbacks.
- Prefer inline exports (e.g., `export function foo`) over grouped exports at the bottom for same-file declarations.
- Use `type` instead of `interface`.
- Use double quotes for strings.
- Prefer `~/...` path aliases for app imports instead of `../...` relative paths.
- Never import a route module from another route module; move shared logic/UI into non-route modules (e.g. `features`, `components`, `utils`).
- Use `import type { ... }` for type imports instead of `import { type ... }` to ensure they are erased at runtime.
- Colocate route-specific components, utils, and hooks in a `./components`, `./utils`, etc. subdirectory within the route's folder. Only move them to global `app/components` or `app/features` if they are shared across multiple routes.

## Style & Quality

- Keep components and functions focused and short.
- Avoid unnecessary abstraction.
- Avoid type casting whenever possible; prefer type-safe narrowing, guards, or runtime validation (e.g., Zod w/inferred types) for untrusted data.
- Keep TypeScript types explicit at boundaries.
- Use Tailwind CSS for styling.
- Prioritize accessibility: semantic HTML, labeled form controls, and meaningful `alt` text.
- Import assets instead of placing them in `public` so they are fingerprinted.
- Use lowercase dash-case for file names.
- Avoid unnecessary comments, especially those that simply repeat module names or obvious code structures (e.g., `// --- Footer Schema ---`).
- Use `Props` as the default prop type name for React components, and only use `ComponentNameProps` when the prop type is exported outside the file.
