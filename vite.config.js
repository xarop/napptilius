import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // '/napptilius/' for GitHub Pages, '/' for single-server (Render fullstack) deployment.
  // Override with VITE_BASE_PATH env var at build time.
  base: process.env.VITE_BASE_PATH ?? '/napptilius/',
  server: {
    proxy: {
      // When running the BFF backend locally, set VITE_API_BASE_URL=/api
      // and Vite will forward all /api requests to the backend.
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
