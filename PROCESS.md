# PROCESS – Development Log / Registre de procés / Registro de proceso

> Complete process log of building this technical challenge.
> Log complet del procés de construcció d'aquest repte tècnic.
> Log completo del proceso de construcción de este reto técnico.

---

## Timeline

### Phase 1 – Analysis & Planning

**Goal:** Understand the challenge requirements and design system before writing any code.

**Actions taken:**
- Read the challenge specifications: React ≥ 17, Node 18, Context API, `x-api-key` auth.
- Reviewed the Figma designs: [Design file](https://www.figma.com/design/Nuic7ePgOfUQ0hcBrUUQrb/) · [Prototype](https://www.figma.com/proto/Nuic7ePgOfUQ0hcBrUUQrb/)
- Identified the API: `https://itx-frontend-test.onrender.com/api`
- Identified key endpoints: `GET /phones`, `GET /phones/:id`, images served from `/api/images/:filename`
- Mapped Figma screens to routes:
  - `/` → Phone list grid
  - `/phones/:id` → Detail page (specs, color, storage, add to cart)
- Decided on optional features to include: multilingual (es/ca/en), CSS variables, responsive grid.

**Key design decisions:**
- **Vite** over CRA (deprecated) for faster DX.
- **Styled Components v6** chosen over plain SASS for component-scoped styles + dynamic theming.
- **CSS Custom Properties** declared in `:root` for globally accessible design tokens.
- **React Context API** (not Redux/Zustand) as required: two contexts – `CartContext` (useReducer) and `PhoneContext` (useState + useEffect).
- **i18next** for i18n: battle-tested, supports plural rules, persists language to localStorage.
- **Vitest** over Jest for native ESM support with Vite (zero config).

---

### Phase 2 – Project Scaffolding

```bash
npm create vite@latest . -- --template react
npm install react-router-dom i18next react-i18next styled-components
npm install -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks \
  eslint-config-prettier @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event vitest jsdom @vitest/coverage-v8
```

**Config files created:**
- `vite.config.js` – added Vitest config block (environment: jsdom, setupFiles, coverage).
- `eslint.config.js` – flat config with react, react-hooks, prettier plugins.
- `.prettierrc` – semi:false, singleQuote:true, 100-char width, trailingComma:es5.
- `.gitignore` – added `coverage`, `.env`, `.env.local`.

---

### Phase 3 – Core Implementation

#### Directory structure

```
src/
├── components/{Header,SearchBar,PhoneCard,PhoneList,Cart,LanguageSelector,NotFound}/
├── context/{CartContext,PhoneContext}.jsx
├── i18n/{index.js,locales/{es,ca,en}.json}
├── pages/{HomePage,DetailPage}/
├── services/api.js
└── styles/{GlobalStyles.js,theme.js}
```

#### API layer (`src/services/api.js`)

- In-memory `Map` cache with 1-hour TTL to satisfy the requirement of caching responses.
- `x-api-key` injected from `VITE_API_KEY` environment variable (gracefully absent if not set).
- Single `request()` helper used by `phonesApi.getAll()` and `phonesApi.getById(id)`.

#### State management

**CartContext:**
- `useReducer` with three action types: `ADD_ITEM`, `REMOVE_ITEM`, `CLEAR_CART`.
- `ADD_ITEM` detects existing items (same id + color + storage) and increments quantity instead of duplicating.
- Exposes `totalItems` and `totalPrice` as derived values.

**PhoneContext:**
- Fetches phone list on mount via `useEffect`.
- Exposes `filteredPhones` computed from `phones` filtered by `searchQuery` (brand, name, description).
- `setSearchQuery` called from `SearchBar` drives real-time filtering.

#### Routing

- `react-router-dom` v7 with `BrowserRouter` in `main.jsx`.
- Three routes: `/`, `/phones/:id`, `*` (404).

#### Internationalisation

- i18next initialised with all three locales in `src/i18n/index.js`.
- Language persisted in `localStorage` key `napptilius_lang`.
- `document.documentElement.lang` updated on language change (accessibility + SEO).
- `LanguageSelector` component: dropdown with keyboard-accessible options.

---

### Phase 4 – UI Components

Components built in order of dependency (bottom-up):

1. **PhoneCard** – link card with image, brand, name, price.
2. **PhoneList** – grid with loading skeletons (pulse animation), error state, no-results state, results count (`aria-live`).
3. **SearchBar** – controlled input inside `<section role="search">`.
4. **LanguageSelector** – custom dropdown; closes on outside click and Escape.
5. **CartDrawer** – slide-in `role="dialog"` panel; traps scroll; closes on Escape and overlay click.
6. **Header** – sticky black bar combining Logo, SearchBar, LanguageSelector, CartButton.
7. **DetailPage** – fetches phone by `:id`, renders image, color swatches, storage buttons, add-to-cart, specs table.
8. **NotFound** – 404 page with link back to home.

**Accessibility checklist applied:**
- Skip-to-content link visible on focus.
- All interactive elements have `aria-label` or visible text.
- Color swatches: `aria-pressed` + `title` with colour name.
- Storage buttons: `aria-pressed`.
- Cart feedback rendered via `aria-live="polite"` region.
- `loading="lazy"` on all images.
- `focus-visible` outline retained (not removed).

---

### Phase 5 – Testing

Tests written with **Vitest** + **React Testing Library**:

| File | Tests | What is tested |
|---|---|---|
| `PhoneCard.test.jsx` | 5 | Renders brand, name, price, link href, image |
| `PhoneList.test.jsx` | 3 | Renders cards, result count, list element |
| `SearchBar.test.jsx` | 3 | Input rendered, placeholder, onChange fires |
| `CartContext.test.jsx` | 5 | Empty start, add, increment qty, remove, clear |
| `api.test.js` | 3 | getAll, getById, error handling |

**Total: 19 tests, all passing.**

---

### Phase 6 – Quality Gates

```bash
npm run build          # ✅ 0 errors, 342 kB bundle
npm test               # ✅ 19/19 passing
npm run lint           # ✅ 0 errors, 0 warnings (with --max-warnings 0)
npm run format:check   # ✅ all files formatted
```

---

### Phase 7 – Documentation

Three Markdown documents created, each trilingual (EN / CA / ES):

- `README.md` – Project overview, features, tech stack, quick start, scripts, structure.
- `SETUP.md` – Prerequisites, installation, env vars, build, test, lint commands.
- `DEVELOP.md` – Architecture, state management, API, styling, i18n, accessibility, testing, code style, how to extend.
- `PROCESS.md` – This file: complete development log.

---

## Challenges & Decisions

### Why Vitest over Jest?
Vite uses native ESM. Jest needs Babel or complex transform config to handle ESM imports. Vitest integrates natively, runs in the same Vite environment, and needs zero extra config.

### Why Styled Components over SASS?
The challenge allows both. Styled Components gives component-scoped styles, dynamic props (e.g. `$selected`, `$open`), and colocated styling without class naming conflicts. CSS variables are added on top for globally accessible design tokens.

### Why Context API instead of Zustand/Redux?
The requirements explicitly state React Context API. The app's state is shallow (cart items + phone list + search query), so Context is perfectly sufficient without the overhead of an external state manager.

### API cache decision
The API docs note a 1-hour cache at the server level. Implementing a matching client-side cache prevents redundant network requests when navigating between list and detail pages, improving perceived performance.

### Multilingual detail
The `document.documentElement.lang` attribute is updated whenever the user switches language. This ensures screen readers announce content in the correct language and search engines index the page language correctly.

---

## What I Would Add with More Time

- **TypeScript** – type-safe props and API responses.
- **React.lazy + Suspense** – code-split DetailPage.
- **End-to-end tests** with Playwright.
- **PWA** – service worker + manifest for offline support.
- **SSR with Next.js** (optional challenge item) for better SEO.
- **Animations** – page transitions with Framer Motion.
- **GitHub Actions CI** – run lint + test on every PR.
- **Deployment** – Vercel or Netlify with preview URLs per branch.
