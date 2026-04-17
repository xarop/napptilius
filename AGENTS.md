# Napptilius – Agent Guidelines

> Concise operating rules for AI agents (GitHub Copilot, Claude, etc.) working on this codebase.

---

## Build & Test

```bash
bun install               # Install dependencies
bun run dev               # Dev server → http://localhost:5173
bun run build             # Production build → ./dist
bun run test              # Run all tests once (Vitest)
bun run test:watch        # Watch mode
bun run test:coverage     # Coverage report
bun run lint              # ESLint (0 warnings allowed)
bun run format            # Prettier – write
bun run format:check      # Prettier – CI-safe check
```

Requires `VITE_API_KEY` in `.env` (see [SETUP.md](./SETUP.md)).

---

## Architecture

React 19 + Vite 6 SPA. No SSR.

| Layer | Tech | Location |
|---|---|---|
| Routing | React Router v7 | `main.jsx` |
| Global state | React Context API | `src/context/` |
| Styling | Styled Components v6 + CSS variables | `src/components/**/*.styled.js`, `src/styles/` |
| i18n | i18next + react-i18next | `src/i18n/` |
| API | Fetch + 1 h in-memory cache | `src/services/api.js` |
| Animations | @formkit/auto-animate | `PhoneList` grid |

Routes: `/` → `HomePage`, `/phones/:id` → `DetailPage`, `/cart` → `CartPage`, `*` → `NotFound`.

---

## File Conventions

Every component lives in its own folder:

```
src/components/MyComponent/
  MyComponent.jsx          # Component logic
  MyComponent.styled.js    # Styled-components (no inline styles)
  MyComponent.test.jsx     # Vitest + RTL tests
```

Pages follow the same pattern under `src/pages/`.

---

## Code Conventions

- **Styled-components transient props** use `$` prefix (e.g. `$selected`, `$color`) to prevent DOM forwarding.
- **CSS custom properties** (e.g. `var(--color-black)`, `var(--spacing-md)`) for all design tokens — never hardcode hex or px values that already exist as tokens. See `src/styles/GlobalStyles.js` for the token list.
- **i18n**: never hardcode user-visible strings. All text goes through `useTranslation()` / `t('key')` with keys defined in `src/i18n/locales/{es,ca,en}.json`.
- **Context only**: no Redux, no Zustand, no Jotai. Cart state lives in `CartContext`, phone/search state in `PhoneContext`, theme in `ThemeContext`.
- **No default exports from styled files** — named exports only.
- **ESLint / Prettier**: `semi: false`, `singleQuote: true`, 100-char width. Zero warnings tolerated.

---

## API

Base URL: `https://prueba-tecnica-api-tienda-moviles.onrender.com`  
Auth: `x-api-key` header from `import.meta.env.VITE_API_KEY`

| Method | Endpoint | Used in |
|---|---|---|
| GET | `/products` | `PhoneContext` (cached) |
| GET | `/products/:id` | `DetailPage` |

---

## Testing

Co-locate tests with the component (`*.test.jsx`). Use **Vitest** + **React Testing Library**.  
Wrap components that need context in the appropriate `*Context.jsx` provider (or a test helper).  
Do not use `act()` directly — prefer `userEvent` and `waitFor` from RTL.

---

## What NOT to Do

- Do not add inline styles (`style={{ ... }}`). Use styled-components or CSS variables.
- Do not hardcode strings visible to the user. Always use `t()`.
- Do not add new state libraries.
- Do not bypass ESLint with `// eslint-disable` unless genuinely unavoidable.
- Do not commit `.env` files.

---

## References

- [README.md](./README.md) – Project overview, features, quick start
- [SETUP.md](./SETUP.md) – Detailed setup, env vars, scripts
- [DEVELOP.md](./DEVELOP.md) – Architecture deep-dive, adding components/languages
- [PROCESS.md](./PROCESS.md) – Full development log and design decisions
- [RETO.md](./RETO.md) – Original challenge specification
