# What's Spinning — React + TypeScript migration

A conservative React/TypeScript/Vite migration of the existing working single-file app. The goal is to preserve the current UI and behavior while making future Lovable edits smaller and safer.

## Run locally
```bash
npm install
npm run dev
```
Open the URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Folder structure
- `src/pages/` — one React wrapper per existing screen.
- `src/pages/markup/` — pixel-preserved markup for each screen during the compatibility phase.
- `src/components/` — app shell, header, background, shared modal groups, and legacy-markup bridge.
- `src/styles/legacy.css` — original CSS, preserved to avoid visual regressions.
- `public/assets/legacy/` — extracted images and downloadable template assets.
- `public/legacy/` — isolated legacy behavior/data scripts.
- `src/hooks/useLegacyRuntime.ts` — boots legacy behavior after React mounts the DOM.
- `src/services/legacyRuntime.ts` — compatibility runtime loader.
- `src/services/backend.ts` — future backend boundary for Supabase/Lovable.
- `src/utils/storage.ts` — typed storage helper for new React code.
- `src/data/legacy-analysis.json` — generated inventory of screens/functions/storage/assets.
- `src/types/` — TypeScript declarations.

## State and persistence
The existing localStorage keys/schema are deliberately preserved so current browser data continues to work. New features should use React state/hooks and move persistent access behind utilities/repositories instead of adding more global variables.

## Main dependencies
- React
- React DOM
- TypeScript
- Vite
- SheetJS/XLSX 0.18.5 (replaces the huge embedded vendor copy from the original HTML)

## Backend / Supabase
No new backend was added. `src/services/backend.ts` is the intended seam for a future Supabase implementation. Keep provider-specific code there rather than inside pages/components.

## Lovable workflow
Use GitHub as the source of truth. Ask Lovable to work on a specific page/component and to preserve the existing legacy runtime until that feature has been migrated and regression-tested. Avoid asking it to rewrite the entire compatibility layer in one prompt.

See `MIGRATION_NOTES.md` for known technical debt and the recommended native-React migration order.

## Important: current Lovable GitHub limitation (Aug 2026)
Lovable's official Git sync does **not** import an already-existing GitHub repository into a Lovable project. The reliable workflow is:
1. Create a new Lovable project (a minimal starter is fine).
2. In Lovable, connect GitHub from Project settings → Git → GitHub. Lovable creates the repository and enables two-way sync.
3. Clone the repository Lovable created.
4. Replace its starter files with the contents of this migrated project.
5. Commit and push to the branch currently selected in Lovable (usually `main`).
6. Lovable syncs those GitHub changes back into the project.

This keeps Lovable's Git sync intact while letting this migration become the project's codebase.

## Integrated feature prototypes

Two formerly standalone prototypes are now part of the application:

- **Social** — replaces the previous “coming soon” social screen. It uses the main app's design tokens and shared `.card`, `.btn`, `.topbar`, input and modal styles. `src/styles/social.css` contains feature-only layout/styles.
- **Listening Session** — available from the home screen. It uses the real main-app record collection when available, writes saved spins/ratings back through the existing main-app stores, and keeps a mini-player available while navigating elsewhere. `src/styles/listening.css` contains only listening-specific visuals/animations.

The prototype-specific mock records remain only as a fallback if the main record store is unavailable. Social backend data is still mocked pending a real backend/Supabase connection.
