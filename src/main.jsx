import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n/index.js'
import App from './App.jsx'

// '/napptilius/' for GitHub Pages, '/' for Render fullstack.
// Set VITE_BASE_PATH at build time to override.
const basename = import.meta.env.VITE_BASE_PATH ?? '/napptilius/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
