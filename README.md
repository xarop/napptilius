# Napptilius – Smartphone Catalog

> Zara Web Challenge · Frontend Technical Test

A responsive, accessible, multilingual smartphone catalog built with React, Styled Components and React Context API.

🔗 **Live demo (Render – frontend + backend):** [napptilius.onrender.com](https://napptilius.onrender.com)  
🔗 **Live demo (GitHub Pages – frontend only):** [xarop.github.io/napptilius](https://xarop.github.io/napptilius/)

---

## Overview

Single-page application that fetches a list of smartphones from a REST API, allows users to search by brand or name, view detailed specs, select color and storage options, and add items to a shopping cart.

## Features

- 📋 **Phone list** with real-time search filter, sticky search bar, shimmer skeleton cards and animated grid reordering
- 🔍 **Detail page** with specs table, color & storage selectors (first color pre-selected), similar items strip and skeleton loading layout
- 🛒 **Cart page** with item management, quantity controls and responsive footer
- ✅ **Order confirmation** page after checkout
- 🌓 **Dark mode** toggle with smooth theme transition (all surfaces fade in 300 ms)
- ✨ **Page transitions** – subtle fade-in + slide-up animation on every route change
- 🌍 **Multilingual** – English / Spanish / Catalan
- ♿ **Accessible** – ARIA roles, skip navigation, keyboard support
- 📱 **Responsive** – mobile-first layout
- ⏳ **Smart loading UX** – inline HTML preloader, shimmer skeletons, slow-server notice after 6 s, image fade-in
- 🧪 **Tested** – Vitest + React Testing Library (19 tests)
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

> **Note on search filtering:** The challenge spec says *"use API filtering"*, but the upstream API does not expose any search or filter parameter on `GET /products` — it always returns the full catalogue. Filtering is therefore performed client-side in `PhoneContext` using a debounced `useMemo` over the cached product list. This is the correct and expected approach given the API constraints.

## Backend BFF (optional)

A Node.js / Express backend lives in `backend/` and provides:

- **Image processing** – removes white backgrounds (BFS flood-fill), crops, resizes to 400 px height and converts to WebP (quality 85) via Sharp.
- **API proxy** – forwards `/api/products` to the upstream, hides the API key, deduplicates responses, fixes inconsistent prices, rewrites image URLs to `/api/image?url=...`.
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

## License

MIT

---

## Credits

| Role | Name |
|---|---|
| Developer | [xarop.com](https://xarop.com) |
| AI Developer | Claude (GitHub Copilot · Anthropic) |
