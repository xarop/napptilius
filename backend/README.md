# Napptilius Backend (BFF)

A lightweight **Backend-for-Frontend** built with Express. It sits between the React SPA and the upstream mobile-phones API, hiding the API key from the client and serving optimised product images.

---

## What it does

### 1. API proxy — `GET /api/products`

Forwards product list and search requests to the upstream API (`prueba-tecnica-api-tienda-moviles.onrender.com`), injecting the `x-api-key` header so the key is never exposed to the browser.

- Supports `search`, `limit`, and `offset` query params (passed through to the upstream).
- Rewrites upstream `http://` image URLs to `https://` for consistency.
- Rewrites product image URLs to go through the local `/api/image` proxy so the client always receives processed WebP images.
- Fixes inconsistent `basePrice` values by fetching the minimum storage-option price from the product detail endpoint when needed.
- **Caches** responses in memory for **5 minutes** (keyed by query params) to avoid hammering the upstream.

### 2. Image processing proxy — `GET /api/image?url=<encodedUrl>`

Downloads a product image from the given HTTPS URL, removes its white background, converts it to WebP, and returns it to the client.

- **White-background removal**: BFS flood-fill from every border pixel. Any near-white edge pixel (R, G, B ≥ 240 by default) and its connected neighbours are made fully transparent.
- **Sharp** handles decoding, compositing, and WebP encoding.
- Concurrency is capped at 3 simultaneous Sharp operations to avoid saturating libuv's thread pool.
- Results are stored in an **LRU in-memory cache** (max 50 entries) so repeated requests for the same URL are served instantly.
- SSRF guard: only `https://` URLs are accepted.
- Responses are sent with `Cache-Control: public, max-age=31536000, immutable` for long-term browser caching.

### 3. SPA static serving (production / Render)

When the frontend has been compiled (`dist/` exists next to the repo root), the server also serves those static files and falls back to `index.html` for client-side routing. This lets the entire app run as a single process on Render.

### 4. Health check — `GET /health`

Returns `{ "status": "ok" }`. Used by Render and other platforms to verify the process is alive.

---

## Project structure

```
backend/
├── src/
│   ├── server.js                        # Express app entry point
│   ├── config.js                        # Env-var loading and defaults
│   └── features/
│       ├── products/
│       │   ├── products.router.js       # GET /api/products route handler
│       │   └── products.cache.js        # 5-minute in-memory product cache
│       └── image/
│           ├── image.router.js          # GET /api/image route handler + SSRF guard
│           ├── image.processor.js       # Sharp pipeline + white-bg removal algorithm
│           └── image.cache.js           # LRU in-memory image buffer cache
├── .env.example                         # Environment variable template
└── package.json
```

---

## Environment variables

Copy `backend/.env.example` to `backend/.env` and fill in the values.

| Variable           | Default                                              | Description                                      |
|--------------------|------------------------------------------------------|--------------------------------------------------|
| `PORT`             | `3001`                                               | Port the server listens on                       |
| `UPSTREAM_API_URL` | `https://prueba-tecnica-api-tienda-moviles.onrender.com` | Base URL of the upstream products API        |
| `API_KEY`          | _(empty)_                                            | API key sent as `x-api-key` to the upstream      |
| `CORS_ORIGIN`      | `http://localhost:5173`                              | Comma-separated list of allowed CORS origins     |

---

## Running locally

```bash
# From the repo root
bun run backend:install   # Install backend dependencies (once)
bun run backend:dev       # Start the server with --watch on http://localhost:3001
```

To route the frontend through the BFF in dev mode, set `VITE_API_BASE_URL=/api` in the frontend `.env`.

---

## Dependencies

| Package  | Purpose                                    |
|----------|--------------------------------------------|
| express  | HTTP server and routing                    |
| cors     | CORS middleware                            |
| dotenv   | `.env` file loading                        |
| sharp    | Image decoding, compositing, WebP encoding |
