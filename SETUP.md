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

| Variable | Required | Description |
|---|---|---|
| `VITE_API_KEY` | No | API key for `x-api-key` header. Leave empty if not needed. |

## Production Build

```bash
bun run build     # Builds to ./dist
bun run preview   # Serves the ./dist folder locally
```

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
