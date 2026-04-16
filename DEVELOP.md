# DEVELOP · Desenvolupament · Desarrollo

## Table of Contents

- [DEVELOP · Desenvolupament · Desarrollo](#develop--desenvolupament--desarrollo)
  - [Table of Contents](#table-of-contents)
  - [Architecture](#architecture)
  - [State Management](#state-management)
  - [API \& Caching](#api--caching)
  - [Styling](#styling)
  - [Internationalisation](#internationalisation)
  - [Accessibility](#accessibility)
  - [Testing](#testing)
  - [Code Style](#code-style)
  - [Adding a New Language](#adding-a-new-language)
  - [Adding a New Component](#adding-a-new-component)

---

## Architecture

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

## State Management

The app uses **React Context API** with two contexts:

- **CartContext** – manages cart items via `useReducer`. Actions: `ADD_ITEM`, `REMOVE_ITEM`, `CLEAR_CART`.
- **PhoneContext** – fetches the phone list on mount, exposes `filteredPhones` (filtered by `searchQuery`).

## API & Caching

`src/services/api.js` wraps `fetch` with:
- **In-memory cache** (Map) with 1-hour TTL – avoids re-fetching on navigation.
- **x-api-key** header injected from `VITE_API_KEY` env var.
- Endpoints: `GET /products`, `GET /products/:id`.

## Loading UX

- **HTML preloader** – an inline spinner and "Mobile Store" label live directly in `index.html` inside `#root`. It is visible before any JS downloads, so users see feedback instantly. React's `createRoot().render()` replaces it automatically when the app mounts.
- **Phone list** – `PhoneContext` initialises `loading` as `true` (not `false`) to prevent a flash of empty grid on first render. While fetching `GET /products`, a pulse-animated grid of 10 `SkeletonCard` placeholders is shown. After 6 s without a response, a `SlowNotice` banner appears informing the user the server is waking up (translatable key `home.slowConnection`).
- **Detail page** – while `DetailPage` fetches `GET /products/:id`, a full shimmer skeleton replicates the real layout: image block, title lines, storage-button row, colour-swatch row, and add-to-cart button.
- **Phone card images** – each `<img>` starts at `opacity: 0` and transitions to `opacity: 1` on the `onLoad` event, avoiding a jarring pop-in.

## Styling

- **Styled Components v6** – component-scoped styles.
- **CSS Custom Properties** – design tokens declared in `:root` via `GlobalStyles.js` for easy theming.
- **Mobile-first** responsive grid: 2 → 3 → 4 → 5 columns.
- **`@formkit/auto-animate`** – FLIP animations on the phone grid. When a search query changes, items animate in/out and reposition automatically (no manual keyframes needed). Applied via `useAutoAnimate()` ref on `<Grid>` in `PhoneList`.

## Internationalisation

- **i18next** with `react-i18next` bindings.
- Three locales: `es`, `ca`, `en`.
- Language is persisted in `localStorage` (`napptilius_lang`).
- `document.documentElement.lang` is updated on language change for screen readers.

## Accessibility

- Skip-to-main-content link.
- ARIA roles: `role="search"`, `role="dialog"`, `role="listbox"`, `role="option"`, `aria-live`, `aria-busy`, `aria-label`, `aria-expanded`, `aria-pressed`.
- Keyboard navigation: Escape closes cart drawer, Enter activates back link.
- `loading="lazy"` on all phone images.
- Colour swatches have `title` + `aria-label` with colour name.

## Testing

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
bun run test          # Single run
bun run test:watch    # Watch mode
bun run test:coverage # Coverage report
```

## Code Style

- **ESLint 9** flat config (`eslint.config.js`) – `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-config-prettier`.
- **Prettier 3** – semi-free, single quotes, 100 char width.
- Zero ESLint warnings allowed in CI (`--max-warnings 0`).

## Adding a New Language

1. Create `src/i18n/locales/<code>.json` (copy `en.json` as template).
2. Import and register in `src/i18n/index.js`.
3. Add `{ code, label }` entry to `LANGS` in `LanguageSelector.jsx`.
4. Add translation key `language.<code>` in all three existing locales.

## Adding a New Component

1. Create folder `src/components/MyComponent/`.
2. Add `MyComponent.jsx`, `MyComponent.styled.js`, `MyComponent.test.jsx`.
3. Export from the component file.
4. Import where needed.

---

## Credits

- **Developer:** [xarop.com](https://xarop.com)
- **AI Developer:** Claude (GitHub Copilot · Anthropic)

