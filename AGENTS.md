# Agent Guidelines

## General
- Use `const` instead of `let` whenever possible.
- Prefer named exports. Use `export default` only when required for routing.
- Keep modules small and single-purpose.
- Prefer function declarations over arrow functions, except for callbacks.
- Use `type` instead of `interface`.
- Use double quotes for strings.

## Style & Quality
- Keep components and functions focused and short.
- Avoid unnecessary abstraction.
- Keep TypeScript types explicit at boundaries.
- Use Tailwind CSS for styling.
- Prioritize accessibility: semantic HTML, labeled form controls, and meaningful `alt` text.
- Import assets instead of placing them in `public` so they are fingerprinted.
- Use dash-case for file names.
