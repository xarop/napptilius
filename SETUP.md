# SETUP · Configuració · Configuración

> Setup guide in **English / Català / Español**

---

## English

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| Git | any |

### Installation

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

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_KEY` | No | API key for `x-api-key` header. Leave empty if not needed. |

### Production Build

```bash
npm run build     # Builds to ./dist
npm run preview   # Serves the ./dist folder locally
```

### Running Tests

```bash
npm test                 # Run all tests once
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report (./coverage/)
```

### Linting & Formatting

```bash
npm run lint             # ESLint (zero warnings allowed)
npm run format           # Prettier – write changes
npm run format:check     # Prettier – check only (CI-safe)
```

---

## Català

### Prerequisits

| Eina | Versió |
|---|---|
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| Git | qualsevol |

### Instal·lació

```bash
# 1. Clona el repositori
git clone https://github.com/xarop/napptilius.git
cd napptilius

# 2. Instal·la les dependències
npm install

# 3. (Opcional) Crea el fitxer d'entorn
cp .env.example .env
# Edita .env i afegeix la teva API key si és necessari

# 4. Inicia el servidor de desenvolupament
npm run dev
```

L'aplicació estarà disponible a **http://localhost:5173**

### Variables d'entorn

| Variable | Obligatòria | Descripció |
|---|---|---|
| `VITE_API_KEY` | No | API key per a la capçalera `x-api-key`. Deixa buit si no cal. |

### Build de producció

```bash
npm run build     # Genera ./dist
npm run preview   # Serveix la carpeta ./dist localment
```

### Execució de proves

```bash
npm test                 # Executa totes les proves una vegada
npm run test:watch       # Mode observació
npm run test:coverage    # Amb informe de cobertura (./coverage/)
```

---

## Español

### Prerrequisitos

| Herramienta | Versión |
|---|---|
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| Git | cualquiera |

### Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/xarop/napptilius.git
cd napptilius

# 2. Instala las dependencias
npm install

# 3. (Opcional) Crea el archivo de entorno
cp .env.example .env
# Edita .env y añade tu API key si es necesario

# 4. Inicia el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en **http://localhost:5173**

### Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `VITE_API_KEY` | No | API key para la cabecera `x-api-key`. Déjala vacía si no hace falta. |

### Build de producción

```bash
npm run build     # Genera ./dist
npm run preview   # Sirve la carpeta ./dist localmente
```

### Ejecución de pruebas

```bash
npm test                 # Ejecuta todas las pruebas una vez
npm run test:watch       # Modo observación
npm run test:coverage    # Con informe de cobertura (./coverage/)
```
