import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* CSS custom properties */
  :root {
    --color-black: #000000;
    --color-white: #ffffff;
    --color-grey-100: #f5f5f5;
    --color-grey-200: #e5e5e5;
    --color-grey-300: #d4d4d4;
    --color-grey-400: #a3a3a3;
    --color-grey-500: #737373;
    --color-grey-700: #404040;
    --color-grey-900: #171717;
    --color-error: #ef4444;
    --color-success: #22c55e;

    --font-body: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-2xl: 48px;

    --transition-fast: 150ms ease;
    --transition-base: 250ms ease;

    --header-height: 56px;
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
