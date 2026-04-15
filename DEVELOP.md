# DEVELOP · Desenvolupament · Desarrollo

> Developer guide in **English / Català / Español**

---

## English

### Architecture

```
src/
├── components/       # Presentational / smart UI components
│   ├── Header/       # Sticky header, search bar, language, cart button
│   ├── SearchBar/    # Controlled search input (reads PhoneContext)
│   ├── PhoneCard/    # Individual phone card (link to detail)
│   ├── PhoneList/    # Grid list with loading skeletons & error state
│   ├── Cart/         # Slide-in cart drawer
│   ├── LanguageSelector/ # Dropdown to switch i18n language
│   └── NotFound/     # 404 page
├── context/
│   ├── CartContext.jsx   # Cart state via useReducer
│   └── PhoneContext.jsx  # Phone list + search state
├── i18n/
│   ├── index.js          # i18next init + lang persistence
│   └── locales/
│       ├── es.json
│       ├── ca.json
│       └── en.json
├── pages/
│   ├── HomePage/         # Route "/" – renders PhoneList
│   └── DetailPage/       # Route "/phones/:id"
├── services/
│   └── api.js            # Fetch wrapper with 1-hour in-memory cache
└── styles/
    ├── GlobalStyles.js   # Styled-components global + CSS variables
    └── theme.js          # Design tokens (colors, spacing, etc.)
```

### State Management

The app uses **React Context API** with two contexts:

- **CartContext** – manages cart items via `useReducer`. Actions: `ADD_ITEM`, `REMOVE_ITEM`, `CLEAR_CART`.
- **PhoneContext** – fetches the phone list on mount, exposes `filteredPhones` (filtered by `searchQuery`).

### API & Caching

`src/services/api.js` wraps `fetch` with:
- **In-memory cache** (Map) with 1-hour TTL – avoids re-fetching on navigation.
- **x-api-key** header injected from `VITE_API_KEY` env var.
- Endpoints: `GET /phones`, `GET /phones/:id`.

### Styling

- **Styled Components v6** – component-scoped styles.
- **CSS Custom Properties** – design tokens declared in `:root` via `GlobalStyles.js` for easy theming.
- **Mobile-first** responsive grid: 2 → 3 → 4 → 5 columns.

### Internationalisation

- **i18next** with `react-i18next` bindings.
- Three locales: `es`, `ca`, `en`.
- Language is persisted in `localStorage` (`napptilius_lang`).
- `document.documentElement.lang` is updated on language change for screen readers.

### Accessibility

- Skip-to-main-content link.
- ARIA roles: `role="search"`, `role="dialog"`, `role="listbox"`, `role="option"`, `aria-live`, `aria-busy`, `aria-label`, `aria-expanded`, `aria-pressed`.
- Keyboard navigation: Escape closes cart drawer, Enter activates back link.
- `loading="lazy"` on all phone images.
- Colour swatches have `title` + `aria-label` with colour name.

### Testing

Tests live alongside components (`*.test.jsx` / `*.test.js`).

```
src/
├── components/
│   ├── PhoneCard/PhoneCard.test.jsx
│   ├── PhoneList/PhoneList.test.jsx
│   └── SearchBar/SearchBar.test.jsx
├── context/
│   └── CartContext.test.jsx
└── services/
    └── api.test.js
```

Run:

```bash
npm test              # Single run
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Code Style

- **ESLint 9** flat config (`eslint.config.js`) – `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-config-prettier`.
- **Prettier 3** – semi-free, single quotes, 100 char width.
- Zero ESLint warnings allowed in CI (`--max-warnings 0`).

### Adding a New Language

1. Create `src/i18n/locales/<code>.json` (copy `en.json` as template).
2. Import and register in `src/i18n/index.js`.
3. Add `{ code, label }` entry to `LANGS` in `LanguageSelector.jsx`.
4. Add translation key `language.<code>` in all three existing locales.

### Adding a New Component

1. Create folder `src/components/MyComponent/`.
2. Add `MyComponent.jsx`, `MyComponent.styled.js`, `MyComponent.test.jsx`.
3. Export from the component file.
4. Import where needed.

---

## Català

### Arquitectura

L'aplicació segueix una arquitectura **feature-first** on cada component té la seva carpeta pròpia amb fitxer principal, estils (styled-components) i tests.

La gestió d'estat es fa mitjançant **React Context API**:
- `CartContext` – cistella de compra amb `useReducer`.
- `PhoneContext` – llistat de telèfons i filtre de cerca.

Les traduccions s'emmagatzemen en fitxers JSON a `src/i18n/locales/` i es gestionen amb **i18next**.

### Estils

S'utilitzen **Styled Components v6** per als estils amb abast de component, i **variables CSS** (Custom Properties) declarades a `:root` per als tokens de disseny globals. El disseny segueix un enfocament **mobile-first**.

### Afegir un nou idioma

1. Crea `src/i18n/locales/<codi>.json` (copia `en.json` com a plantilla).
2. Importa i registra a `src/i18n/index.js`.
3. Afegeix `{ code, label }` a `LANGS` a `LanguageSelector.jsx`.
4. Afegeix la clau `language.<codi>` als tres idiomes existents.

---

## Español

### Arquitectura

La aplicación sigue una arquitectura **feature-first** donde cada componente tiene su propia carpeta con archivo principal, estilos (styled-components) y tests.

La gestión de estado se realiza mediante **React Context API**:
- `CartContext` – carrito de compra con `useReducer`.
- `PhoneContext` – listado de teléfonos y filtro de búsqueda.

Las traducciones se almacenan en archivos JSON en `src/i18n/locales/` y se gestionan con **i18next**.

### Estilos

Se utilizan **Styled Components v6** para estilos con ámbito de componente, y **variables CSS** (Custom Properties) declaradas en `:root` para los tokens de diseño globales. El diseño sigue un enfoque **mobile-first**.

### Añadir un nuevo idioma

1. Crea `src/i18n/locales/<código>.json` (copia `en.json` como plantilla).
2. Importa y registra en `src/i18n/index.js`.
3. Añade `{ code, label }` a `LANGS` en `LanguageSelector.jsx`.
4. Añade la clave `language.<código>` en los tres idiomas existentes.
