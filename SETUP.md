# SETUP · Configuració · Configuración

> Setup guide

## Table of Contents

- [SETUP · Configuració · Configuración](#setup--configuració--configuración)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Production Build](#production-build)
  - [Running Tests](#running-tests)
  - [Linting \& Formatting](#linting--formatting)

---

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| Bun | ≥ 1.0 (or npm ≥ 9) |
| Git | any |

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/xarop/napptilius.git
cd napptilius

# 2. Install dependencies
bun install          # or: npm install

# 3. (Optional) Create environment file
cp .env.example .env
# Edit .env and add your API key if required:
# VITE_API_KEY=your_key_here

# 4. Start development server
bun run dev
```

The app will be available at **http://localhost:5173**

## Environment Variables

### Frontend (`.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_KEY` | No | API key for `x-api-key` header (direct upstream calls only). |
| `VITE_API_BASE_URL` | No | Set to `/api` in dev (routes through BFF proxy) or to the deployed backend URL in production. Leave empty to call the upstream API directly. |

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | Port the Express server listens on. |
| `API_KEY` | — | API key forwarded to the upstream. |
| `UPSTREAM_API_URL` | upstream URL | Base URL of the upstream REST API. |
| `CORS_ORIGIN` | `http://localhost:5173` | Comma-separated allowed origins. |

## Production Build

```bash
bun run build     # Builds to ./dist
bun run preview   # Serves the ./dist folder locally
```

## Backend (optional)

```bash
# Install backend dependencies (once)
bun run backend:install   # or: cd backend && npm install

# Start backend dev server (port 3001)
bun run backend:dev

# Copy and fill in backend env vars
cp backend/.env.example backend/.env
```

The backend exposes:
- `GET /api/products` – proxied + processed product list
- `GET /api/image?url=<encoded>` – processed WebP image

In dev, the Vite proxy forwards `/api` → `http://localhost:3001` automatically.  
Set `VITE_API_BASE_URL=/api` in your frontend `.env` to route through the BFF.

## Running Tests

```bash
bun run test                 # Run all tests once
bun run test:watch           # Watch mode
bun run test:coverage        # With coverage report (./coverage/)
```

## Linting & Formatting

```bash
bun run lint             # ESLint (zero warnings allowed)
bun run format           # Prettier – write changes
bun run format:check     # Prettier – check only (CI-safe)
```
