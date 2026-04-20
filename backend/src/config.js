import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

// Resolve .env from the backend root regardless of the cwd
const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env') })

const rawOrigins = process.env.CORS_ORIGIN ?? 'http://localhost:5173'

const config = {
    port: Number(process.env.PORT ?? 3001),
    upstreamUrl:
        process.env.UPSTREAM_API_URL ?? 'https://prueba-tecnica-api-tienda-moviles.onrender.com',
    apiKey: process.env.API_KEY ?? '',
    corsOrigin: rawOrigins.split(',').map(o => o.trim()),
}

export default config
