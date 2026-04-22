# Napptilius – Smartphone Catalog
> This project is a response to the [Zara Web Challenge](./RETO.md) — see the file for the original spec and a full implementation checklist.


A responsive, accessible, multilingual smartphone catalog built with React, Styled Components and React Context API.

🔗 **Live demo (Render – frontend + backend):** [napptilius.onrender.com](https://napptilius.onrender.com)  
🔗 **Live demo (GitHub Pages – frontend only):** [xarop.github.io/napptilius](https://xarop.github.io/napptilius/)

---

## Overview

Single-page application that fetches a list of smartphones from a REST API, allows users to search by brand or name, view detailed specs, select color and storage options, and add items to a shopping cart.

## Features

- 📋 **Phone list** with real-time search filter, sticky search bar, shimmer skeleton cards and animated grid reordering. The challenge spec requires showing 20 items — this implementation fetches the full catalogue and shows the first 20 with a **Load More** button to reveal any additional items
- 🔍 **Detail page** with specs table, color & storage selectors (first color pre-selected), similar items strip and skeleton loading layout
- 🛒 **Cart page** with item management, quantity controls and responsive footer
- ✅ **Order confirmation** page after checkout
- 🌓 **Dark mode** toggle with smooth theme transition (all surfaces fade in 300 ms) — defaults to light theme regardless of OS preference
- ✨ **Page transitions** – subtle fade-in + slide-up animation on every route change, with scroll-to-top on navigation
- 🌍 **Multilingual** – English / Spanish / Catalan
- ♿ **Accessible** – ARIA roles, skip navigation, keyboard support
- 📱 **Responsive** – mobile-first layout
- ⏳ **Smart loading UX** – inline HTML preloader, shimmer skeletons, slow-server notice after 6 s, image fade-in
- 🧪 **Tested** – Vitest + React Testing Library (27 tests)
- 🔧 **Linted** – ESLint + Prettier
- 🚀 **Deployed** – [Render](https://napptilius.onrender.com) (fullstack) · [GitHub Pages](https://xarop.github.io/napptilius/) (frontend only)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 6 |
| Routing | React Router v7 |
| State | React Context API + useReducer |
| Styling | Styled Components v6 + CSS Variables |
| Animations | @formkit/auto-animate |
| i18n | i18next + react-i18next |
| Testing | Vitest + Testing Library |
| Linting | ESLint 9 + Prettier 3 |
| Runner | Bun |
| Node | ≥ 18 |

## API

Base URL: `https://prueba-tecnica-api-tienda-moviles.onrender.com`

| Endpoint | Description |
|---|---|
| `GET /products` | List of all phones (cached 1 h) |
| `GET /products/:id` | Phone detail |

Authentication via `x-api-key` header – set `VITE_API_KEY` in `.env`.

> **Search filtering:** The challenge spec requires *"API filtering"*. The BFF backend forwards `?search=<query>` to the upstream API (`GET /products?search=…`), and the frontend passes the debounced query (≥ 2 chars) directly to the API endpoint instead of filtering client-side.

## Backend BFF (optional)

A Node.js / Express backend lives in `backend/` and provides:

- **Image processing** – removes white backgrounds (BFS flood-fill), crops, resizes to 400 px height and converts to WebP (quality 85) via Sharp.
- **API proxy** – forwards `/api/products` to the upstream, hides the API key, deduplicates responses, fixes inconsistent prices, rewrites image URLs to `/api/image?url=...`, and **limits the response to the first N products** (default 20, configurable via `PRODUCTS_DEFAULT_LIMIT`).
- **LRU image cache** – 50 entries; processed images are served with `Cache-Control: immutable`.

When `VITE_API_BASE_URL` is set, the frontend routes all requests through the BFF instead of the upstream directly.

### Running the backend locally

```bash
bun run backend:install   # Install backend deps once
bun run backend:dev       # Start on http://localhost:3001
```

### Deploying

**Option A – Render (frontend + backend, recommended)**

The repo includes a `render.yaml` Blueprint for one-click deploy:

1. Go to [Render](https://render.com) → *New → Blueprint* → connect `xarop/napptilius`.
2. Render detects `render.yaml` and creates the service automatically.
3. Set `API_KEY` in the Render dashboard (env var, sync: false).
4. Live at **[napptilius.onrender.com](https://napptilius.onrender.com)**.

> Note: free tier has a ~30 s cold start after inactivity.

**Option B – GitHub Pages (frontend only)**

The existing GitHub Actions workflow deploys the SPA to **[xarop.github.io/napptilius](https://xarop.github.io/napptilius/)** on every push to `main`. No backend — images load from the upstream API directly.

## Quick Start

```bash
bun install
bun run dev        # http://localhost:5173
```

See [SETUP.md](./SETUP.md) for detailed setup and [DEVELOP.md](./DEVELOP.md) for contributing guidelines.


## Scripts

```bash
bun run dev          # Start dev server
bun run build        # Production build
bun run preview      # Preview production build
bun run lint         # Run ESLint
bun run format       # Format with Prettier
bun run test         # Run all tests (Vitest)
bun run test:coverage # Run tests with coverage
```

## Project Structure

```
src/
├── components/
│   ├── Breadcrumb/
│   ├── Cart/              # CartDrawer (slide-in)
│   ├── Footer/
│   ├── Header/
│   ├── LanguageSelector/
│   ├── NotFound/
│   ├── PhoneCard/
│   ├── PhoneList/         # Grid with FLIP animations
│   ├── SearchBar/
│   ├── SimilarItems/
│   └── ThemeToggle/
├── context/               # CartContext, PhoneContext, ThemeContext
├── i18n/                  # Translations (es, ca, en)
├── pages/
│   ├── CartPage/
│   ├── DetailPage/
│   ├── HomePage/
│   └── OrderConfirmationPage/
├── services/              # API layer with in-memory cache
└── styles/                # GlobalStyles (CSS variables), theme
```

## Future Improvements

- **E2E Testing** – Playwright tests for critical user flows (search, add to cart, checkout).
- **Unit Testing** – Expand Vitest coverage to include filtering logic, cart reducer edge cases and hook behaviour.
- **CI/CD** – GitHub Actions workflow for lint + test + build on every PR, with auto-deploy to Render on merge to `main`.
- **Virtualised list** – `@tanstack/react-virtual` for the phone grid when the catalogue grows beyond a few hundred items.
- **PWA / offline** – Service worker + `vite-plugin-pwa` so the catalogue is browsable without a network connection.

---

## Design Decisions

**Why React (SPA) and not Next.js?**
The challenge spec has no SEO requirements and the data is fetched client-side from a single API. A SPA with Vite is lighter, faster to iterate on, and avoids SSR complexity that isn't justified by the scope. Next.js would have been the right call if SEO or server-rendered pages were required.

**Why JavaScript and not TypeScript?**
A deliberate trade-off: for a solo, time-boxed project the overhead of typing every API response and component prop adds friction without adding safety beyond what tests already provide. In a team codebase or shared library, TypeScript would be the default.

**Why a BFF instead of calling the upstream API directly?**
Three concrete reasons: (1) the API key must not be exposed to the browser, (2) the upstream API returns inconsistent prices and duplicate products that need normalisation, (3) images have white backgrounds and no consistent format — the BFF strips backgrounds, crops, resizes and converts to WebP so the frontend receives clean assets. All three are production concerns, not over-engineering.

**Why Styled Components and not Tailwind or CSS Modules?**
Component-scoped styles, dynamic theming via CSS custom properties and dark mode without extra config. Tailwind is a valid alternative — the choice here was familiarity and speed for a time-boxed project.

**Why Vitest and not Jest?**
Vitest shares Jest's API and runs natively inside Vite's pipeline. No separate babel config, no jsdom setup file differences. For a Vite project, Jest is an unnecessary dependency.

---

## License

MIT

---

## Credits

[xarop.com](https://xarop.com)
