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
| npm | ≥ 9 |
| Git | any |

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/xarop/napptilius.git
cd napptilius

# 2. Install dependencies
npm install

# 3. (Optional) Create environment file
cp .env.example .env
# Edit .env and add your API key if required:
# VITE_API_KEY=your_key_here

# 4. Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_KEY` | No | API key for `x-api-key` header. Leave empty if not needed. |

## Production Build

```bash
npm run build     # Builds to ./dist
npm run preview   # Serves the ./dist folder locally
```

## Running Tests

```bash
npm test                 # Run all tests once
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report (./coverage/)
```

## Linting & Formatting

```bash
npm run lint             # ESLint (zero warnings allowed)
npm run format           # Prettier – write changes
npm run format:check     # Prettier – check only (CI-safe)
```
