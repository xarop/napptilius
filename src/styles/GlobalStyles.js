import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* CSS custom properties */
  :root {
    /* ─ Colors ──────────────────────────────────────── */
    --color-black:     #000000;
    --color-white:     #ffffff;
    --color-grey-100:  #f5f5f5;
    --color-grey-200:  #e5e5e5;
    --color-grey-300:  #d4d4d4;
    --color-grey-400:  #a3a3a3;
    --color-grey-500:  #737373;
    --color-grey-700:  #404040;
    --color-grey-900:  #171717;
    --color-error:     #ef4444;
    --color-success:   #22c55e;

    /* ─ Typography – family ─────────────────────────── */
    --font-body: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    /* ─ Typography – size scale ─────────────────────── */
    --fs-2xs:  0.65rem;   /* 10.4px  tiny labels        */
    --fs-xs:   0.7rem;    /* 11.2px  overlines / tags   */
    --fs-section-title: var(--fs-lg); /* section headings: SPECS, SIMILAR ITEMS — 20px */
    --fs-sm:   0.75rem;   /* 12px    small labels       */
    --fs-body: 0.8rem;    /* 12.8px  secondary body     */
    --fs-md:   0.875rem;  /* 14px    body / buttons     */
    --fs-base: 1rem;      /* 16px    default            */
    --fs-lg:   1.25rem;   /* 20px    sub-headings       */
    --fs-xl:   1.5rem;    /* 24px    headings           */
    --fs-2xl:  1.875rem;  /* 30px    display            */

    /* ─ Typography – weight ─────────────────────────── */
    --fw-light:    300;
    --fw-regular:  400;
    --fw-medium:   500;
    --fw-semibold: 600;
    --fw-bold:     700;

    /* ─ Typography – letter-spacing ────────────────── */
    --ls-tight:   0.02em;
    --ls-sm:      0.04em;
    --ls-md:      0.05em;
    --ls-base:    0.06em;
    --ls-wide:    0.08em;
    --ls-wider:   0.1em;
    --ls-widest:  0.12em;

    /* ─ Typography – line-height ────────────────────── */
    --lh-tight:  1.2;
    --lh-normal: 1.5;

    /* ─ Spacing ─────────────────────────────────────── */
    --spacing-xs:  4px;
    --spacing-sm:  8px;
    --spacing-md:  16px;
    --spacing-lg:  24px;
    --spacing-xl:  32px;
    --spacing-2xl: 48px;
    --spacing-3xl: 64px;

    /* ─ Layout ───────────────────────────────────────── */
    --max-width-page:   1280px;
    --max-width-drawer: 400px;
    --header-height:    56px;

    /* ─ Border radius ───────────────────────────────── */
    --radius-none: 0;
    --radius-sm:   2px;
    --radius-full: 9999px;

    /* ─ Shadows ─────────────────────────────────────── */
    --shadow-sm:     0 4px 16px rgba(0, 0, 0, 0.12);
    --shadow-md:     0 4px 20px rgba(0, 0, 0, 0.12);
    --shadow-drawer: -4px 0 24px rgba(0, 0, 0, 0.12);

    /* ─ Z-index ─────────────────────────────────────── */
    --z-footer:   10;
    --z-header:   100;
    --z-dropdown: 200;
    --z-overlay:  300;
    --z-drawer:   400;

    /* ─ Transitions ─────────────────────────────────── */
    --transition-fast: 150ms ease;
    --transition-base: 250ms ease;
    --transition-slow: 350ms ease;
  }

  /* Dark mode overrides */
  [data-theme="dark"] {
    --color-black: #ffffff;
    --color-white: #0a0a0a;
    --color-grey-100: #1a1a1a;
    --color-grey-200: #2a2a2a;
    --color-grey-300: #3a3a3a;
    --color-grey-400: #555555;
    --color-grey-500: #888888;
    --color-grey-700: #bbbbbb;
    --color-grey-900: #e5e5e5;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-body);
    background-color: var(--color-white);
    color: var(--color-black);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 250ms ease, color 250ms ease;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  ul, ol {
    list-style: none;
  }

  /* Focus visible styles for accessibility */
  :focus-visible {
    outline: 2px solid var(--color-black);
    outline-offset: 2px;
  }

  /* Skip navigation link */
  .skip-nav {
    position: absolute;
    top: -100%;
    left: 0;
    z-index: 9999;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-black);
    color: var(--color-white);
    font-weight: 700;
    transition: top var(--transition-fast);

    &:focus {
      top: 0;
    }
  }
`

export default GlobalStyles
