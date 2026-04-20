import express from 'express'
import cors from 'cors'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import config from './config.js'
import productsRouter from './features/products/products.router.js'
import imageRouter from './features/image/image.router.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(cors({ origin: config.corsOrigin }))
app.use(express.json())

// ── API routes ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/products', productsRouter)
app.use('/api/image', imageRouter)

// 404 for unknown /api routes (must come before SPA fallback)
app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Not Found' })
})

// ── SPA static serving (fullstack / Render deployment) ─────────────────────
// Activated only when the frontend has been compiled into ../../dist.
const distPath = join(__dirname, '../../dist')
if (existsSync(distPath)) {
    app.use(express.static(distPath))
    app.get('*', (_req, res) => {
        res.sendFile(join(distPath, 'index.html'))
    })
}

// ── Global error handler ───────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
    console.error('Server error:', err)
    res.status(502).json({ error: 'Upstream error', message: 'Failed to reach the upstream API' })
})

// ── Start ──────────────────────────────────────────────────────────────────
const PORT = config.port

app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`)
})
