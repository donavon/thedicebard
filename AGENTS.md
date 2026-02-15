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

## Style & Quality

- Keep components and functions focused and short.
- Avoid unnecessary abstraction.
- Avoid type casting whenever possible; prefer type-safe narrowing, guards, and better type definitions.
- Keep TypeScript types explicit at boundaries.
- Use Tailwind CSS for styling.
- Prioritize accessibility: semantic HTML, labeled form controls, and meaningful `alt` text.
- Import assets instead of placing them in `public` so they are fingerprinted.
- Use dash-case for file names.
