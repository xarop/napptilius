# 📱 Napptilius – Smartphone Catalog

> Zara Web Challenge · Frontend Technical Test

A responsive, accessible, multilingual smartphone catalog built with React, Styled Components and React Context API.

---

## 🌐 Languages / Idiomas / Idiomes

- [English](#english)
- [Español](#español)
- [Català](#català)

---

## English

### Overview

Single-page application that fetches a list of smartphones from a REST API, allows users to search by brand or name, view detailed specs, select color and storage options, and add items to a shopping cart.

### Features

- 📋 **Phone list** with real-time search filter
- 🔍 **Detail page** with specs, color & storage selectors
- 🛒 **Cart drawer** with item management
- 🌍 **Multilingual** – English / Spanish / Catalan
- ♿ **Accessible** – ARIA roles, skip navigation, keyboard support
- 📱 **Responsive** – mobile-first grid layout
- 🧪 **Tested** – Vitest + React Testing Library (19 tests)
- 🔧 **Linted** – ESLint + Prettier

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router v7 |
| State | React Context API + useReducer |
| Styling | Styled Components v6 + CSS Variables |
| i18n | i18next + react-i18next |
| Testing | Vitest + Testing Library |
| Linting | ESLint 9 + Prettier 3 |
| Node | ≥ 18 |

### API

Base URL: `https://itx-frontend-test.onrender.com/api`

| Endpoint | Description |
|---|---|
| `GET /phones` | List of all phones (cached 1 h) |
| `GET /phones/:id` | Phone detail |
| `GET /images/:filename` | Phone images |

Authentication via `x-api-key` header (optional – set `VITE_API_KEY` in `.env`).

### Quick Start

```bash
npm install
npm run dev        # http://localhost:5173
```

See [SETUP.md](./SETUP.md) for detailed setup and [DEVELOP.md](./DEVELOP.md) for contributing guidelines.

### Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm test             # Run all tests
npm run test:coverage # Run tests with coverage
```

### Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header/
│   ├── SearchBar/
│   ├── PhoneCard/
│   ├── PhoneList/
│   ├── Cart/
│   ├── LanguageSelector/
│   └── NotFound/
├── context/          # React Context (Cart, Phones)
├── i18n/             # Translations (es, ca, en)
├── pages/            # Route-level pages
│   ├── HomePage/
│   └── DetailPage/
├── services/         # API layer with cache
└── styles/           # GlobalStyles, theme
```

---

## Español

### Descripción

Aplicación de una sola página que consume una API REST de smartphones. Permite buscar por marca o nombre, ver especificaciones detalladas, seleccionar color y almacenamiento, y añadir artículos al carrito.

### Características

- 📋 **Lista de teléfonos** con filtro de búsqueda en tiempo real
- 🔍 **Página de detalle** con specs, selector de color y almacenamiento
- 🛒 **Carrito lateral** con gestión de artículos
- 🌍 **Multilingüe** – Inglés / Español / Catalán
- ♿ **Accesible** – Roles ARIA, skip nav, soporte de teclado
- 📱 **Responsive** – Layout grid mobile-first
- 🧪 **Testado** – Vitest + React Testing Library

### Inicio Rápido

```bash
npm install
npm run dev   # http://localhost:5173
```

Consulta [SETUP.md](./SETUP.md) para la configuración detallada.

---

## Català

### Descripció

Aplicació d'una sola pàgina que consumeix una API REST d'smartphones. Permet cercar per marca o nom, veure especificacions detallades, seleccionar color i emmagatzematge, i afegir articles a la cistella.

### Característiques

- 📋 **Llista de telèfons** amb filtre de cerca en temps real
- 🔍 **Pàgina de detall** amb specs, selector de color i emmagatzematge
- 🛒 **Cistella lateral** amb gestió d'articles
- 🌍 **Multilingüe** – Anglès / Castellà / Català
- ♿ **Accessible** – Rols ARIA, skip nav, suport de teclat
- 📱 **Responsive** – Layout grid mobile-first
- 🧪 **Testejat** – Vitest + React Testing Library

### Inici Ràpid

```bash
npm install
npm run dev   # http://localhost:5173
```

Consulta [SETUP.md](./SETUP.md) per a la configuració detallada.

---

## License

MIT
