# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Asset Preservation

- Treat every manually modified asset as an intentional user change and preserve it.
- Never restore, revert, overwrite, rename, move, or delete a modified asset solely because Git or Git LFS reports it as changed.
- Before replacing or removing an existing asset, verify its current contents and references and obtain explicit user authorization for that specific asset.
- When reorganizing assets, prefer updating references to the current user-provided files rather than recovering older versions from Git or Git LFS.

## Deleting or Replacing Assets — Required Before Every Commit

When the user intentionally removes, hides, replaces, or anonymizes media or content (especially for confidentiality):

1. Treat the removal as authoritative; **never** restore the old file, recover it from history, or replace it with invented/confidential content just to make a build pass.
2. Identify and update **every reference** to the old path or data across `src/`, `public/`, CSS, TypeScript data objects (including `src/data/cases.ts`), components, templates, SEO metadata, preload links, manifests and scripts.
3. If the removed asset was optional, remove its obsolete data property and any now-unused presentation, width, alt or layout settings. Keep the component's conditional rendering intact and preserve the surrounding semantic HTML.
4. If a replacement file was supplied, update references to the **exact existing replacement path**, verify its presence and format, and preserve all unrelated user assets. Never invent paths or generate replacement media without authorization.
5. Search the entire relevant working tree for the deleted filename and old URL. Resolve remaining references before committing. Do not silence or disable `scripts/check-media.mjs`, weaken TypeScript validation, or ignore build errors.
6. Run `node scripts/check-media.mjs`, `pnpm exec tsc --noEmit`, and `pnpm run build` (or the existing equivalent) before considering the task finished. If an unrelated pre-existing error remains, report it precisely rather than pretending the build succeeded.
7. Preserve intentional deletions in Git. Never auto-reintroduce removed files during merge, cherry-pick, sync, checkout, asset recovery, or Git LFS troubleshooting. If two branches differ, reconcile with the user's latest explicit removal decision.
8. Before delivery, report what was removed/repointed, verify no stale paths remain, and state the exact validation status. Avoid exposing confidential filenames, contents or data in public-facing UI, error messages, analytics or logs.

**Invariant:** a user-approved removal/replacement is a complete source-code + UI + metadata update, not merely a filesystem operation.
