# Napptilius – Smartphone Catalog

> Zara Web Challenge · Frontend Technical Test

A responsive, accessible, multilingual smartphone catalog built with React, Styled Components and React Context API.

🔗 **Live demo:** [xarop.github.io/napptilius](https://xarop.github.io/napptilius/)

---

## Overview

Single-page application that fetches a list of smartphones from a REST API, allows users to search by brand or name, view detailed specs, select color and storage options, and add items to a shopping cart.

## Features

- 📋 **Phone list** with real-time search filter and sticky search bar
- 🔍 **Detail page** with specs table, color & storage selectors, similar items strip
- 🛒 **Cart page** with item management and responsive footer
- 🌓 **Dark mode** toggle
- 🌍 **Multilingual** – English / Spanish / Catalan
- ♿ **Accessible** – ARIA roles, skip navigation, keyboard support
- 📱 **Responsive** – mobile-first layout
- 🧪 **Tested** – Vitest + React Testing Library (19 tests)
- 🔧 **Linted** – ESLint + Prettier
- 🚀 **Deployed** – GitHub Pages via GitHub Actions

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 6 |
| Routing | React Router v7 |
| State | React Context API + useReducer |
| Styling | Styled Components v6 + CSS Variables |
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
│   ├── Cart/           # CartDrawer
│   ├── Footer/
│   ├── Header/
│   ├── LanguageSelector/
│   ├── NotFound/
│   ├── PhoneCard/
│   ├── PhoneList/
│   ├── SearchBar/
│   ├── SimilarItems/
│   └── ThemeToggle/
├── context/            # CartContext, PhoneContext, ThemeContext
├── i18n/               # Translations (es, ca, en)
├── pages/
│   ├── CartPage/
│   ├── DetailPage/
│   └── HomePage/
├── services/           # API layer with in-memory cache
└── styles/             # GlobalStyles (CSS variables), theme
```

---

## License

MIT

---

## Credits

| Role | Name |
|---|---|
| Developer | [xarop.com](https://xarop.com) |
| AI Developer | Claude (GitHub Copilot · Anthropic) |
