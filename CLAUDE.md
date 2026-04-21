# CLAUDE.md

> Claude Code entry point for the Napptilius project.
> Full technical conventions are in [AGENTS.md](./AGENTS.md).

## Quick start

```bash
bun install
bun run dev            # http://localhost:5173
bun run backend:dev    # BFF on http://localhost:3001 (optional, separate terminal)
bun run test
bun run lint
```

Set `VITE_API_BASE_URL=/api` in `.env` to route frontend through the BFF in dev.

## Project in one paragraph

React 19 SPA (Vite, no SSR) — smartphone catalog for the Zara Web Challenge. Optional Node/Express BFF in `backend/` that proxies the upstream API, processes images (BFS background removal → WebP via Sharp) and limits the response to N products. Frontend uses Styled Components, React Context + useReducer, React Router v7, i18next (ES/CA/EN). Deployed on Render (fullstack) and GitHub Pages (frontend-only).

## Key constraints

- **No new state libraries.** Context only: `CartContext`, `PhoneContext`, `ThemeContext`.
- **No inline styles.** Styled-components or CSS custom properties only.
- **No hardcoded user-visible strings.** Always `t('key')` via i18next.
- **Styled-components transient props** use `$` prefix to avoid DOM forwarding.
- **ESLint zero warnings.** Run `bun run lint` before considering a task done.
- **Vitest, not Jest.** Same API, better Vite integration.

## Build variants

| Command | Output | Target |
|---|---|---|
| `bun run build` | base `/napptilius/`, direct API | GitHub Pages |
| `bun run build:fullstack` | base `/`, routes through BFF | Render |

## Where things live

| What | Where |
|---|---|
| Components | `src/components/<Name>/<Name>.jsx` + `.styled.js` + `.test.jsx` |
| Pages | `src/pages/<Name>/` (same pattern) |
| State | `src/context/` |
| API layer | `src/services/api.js` (1h in-memory cache) |
| Translations | `src/i18n/locales/{es,ca,en}.json` |
| Design tokens | `src/styles/GlobalStyles.js` (CSS custom properties) |
| BFF routes | `backend/src/features/products/` and `backend/src/features/image/` |

## Docs map

| File | Purpose |
|---|---|
| [AGENTS.md](./AGENTS.md) | Full conventions — read before touching code |
| [SETUP.md](./SETUP.md) | Env vars, scripts, deployment |
| [DEVELOP.md](./DEVELOP.md) | Architecture deep-dive, adding components/languages |
| [PROCESS.md](./PROCESS.md) | Development log and design decisions |
| [RETO.md](./RETO.md) | Original Zara challenge spec + checklist |
