import { Router } from 'express'
import config from '../../config.js'
import { preloadImages } from '../image/image.processor.js'
import { getCachedProducts, setCachedProducts } from './products.cache.js'

const router = Router()

const upstreamUrl = path => `${config.upstreamUrl}${path}`

/** Normalise http:// image URLs coming from the upstream API to https:// */
const toHttps = url => url.replace(/^http:\/\//i, 'https://')

/**
 * Rewrite an upstream image URL to go through our own /api/image endpoint so
 * the client always receives a processed (background-removed) WebP.
 */
const toImageProxy = url => `/api/image?url=${encodeURIComponent(toHttps(url))}`

const upstreamHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': config.apiKey,
}

/** Fetch the minimum storage price for a product (used to fix inconsistent basePrice). */
const fetchMinStoragePrice = async id => {
    try {
        const res = await fetch(upstreamUrl(`/products/${id}`), { headers: upstreamHeaders })
        if (!res.ok) return undefined
        const detail = await res.json()
        if (!Array.isArray(detail.storageOptions) || detail.storageOptions.length === 0)
            return undefined
        return Math.min(...detail.storageOptions.map(s => s.price))
    } catch {
        return undefined
    }
}

// ── GET /api/products ──────────────────────────────────────────────────────

router.get('/', async (req, res, next) => {
    try {
        const { search, limit, offset } = req.query
        const cacheKey = JSON.stringify({ search, limit, offset })

        const cached = getCachedProducts(cacheKey)
        if (cached !== undefined) {
            res.json(cached)
            return
        }

        const url = new URL(upstreamUrl('/products'))
        if (search) url.searchParams.set('search', String(search))
        if (limit) url.searchParams.set('limit', String(limit))
        if (offset) url.searchParams.set('offset', String(offset))

        const upstream = await fetch(url, { headers: upstreamHeaders })
        let raw
        try {
            raw = await upstream.json()
        } catch {
            res.status(502).json({ error: 'Upstream error', message: 'Failed to reach the upstream API' })
            return
        }

        // Deduplicate by id (upstream occasionally returns duplicates)
        const seenIds = new Set()
        const deduped = Array.isArray(raw)
            ? raw.reduce((acc, p, index) => {
                if (seenIds.has(p.id)) return acc
                seenIds.add(p.id)
                acc.push({
                    ...p,
                    renderKey: `${p.id}-${index}`,
                    imageUrl: typeof p.imageUrl === 'string' ? toImageProxy(p.imageUrl) : p.imageUrl,
                })
                return acc
            }, [])
            : raw

        // Fix inconsistent basePrice: overwrite with min real storage price
        const data =
            upstream.ok && Array.isArray(deduped)
                ? await Promise.all(
                    deduped.map(async p => {
                        const minPrice = await fetchMinStoragePrice(p.id)
                        if (minPrice !== undefined && minPrice !== p.basePrice) {
                            return { ...p, basePrice: minPrice }
                        }
                        return p
                    }),
                )
                : deduped

        if (upstream.ok && Array.isArray(data)) {
            setCachedProducts(cacheKey, data)
        }

        res.status(upstream.status).json(data)

        // Preload images in the background — they'll be warm when the browser requests them
        if (Array.isArray(data)) {
            // Extract the original URLs from our proxy URLs for preloading
            const originalUrls = data
                .map(p => {
                    if (typeof p.imageUrl !== 'string') return null
                    try {
                        const proxyUrl = new URL(p.imageUrl, 'http://localhost')
                        return proxyUrl.searchParams.get('url')
                    } catch {
                        return null
                    }
                })
                .filter(Boolean)
            preloadImages(originalUrls)
        }
    } catch (err) {
        next(err)
    }
})

// ── GET /api/products/:id ──────────────────────────────────────────────────

router.get('/:id', async (req, res, next) => {
    try {
        const upstream = await fetch(upstreamUrl(`/products/${req.params.id}`), {
            headers: upstreamHeaders,
        })
        let data
        try {
            data = await upstream.json()
        } catch {
            res.status(502).json({ error: 'Upstream error', message: 'Failed to reach the upstream API' })
            return
        }

        // Rewrite all image URLs to go through the image proxy
        if (typeof data.imageUrl === 'string') {
            data.imageUrl = toImageProxy(data.imageUrl)
        }
        if (Array.isArray(data.colorOptions)) {
            data.colorOptions = data.colorOptions.map(c =>
                typeof c.imageUrl === 'string' ? { ...c, imageUrl: toImageProxy(c.imageUrl) } : c,
            )
        }

        // Fix inconsistent basePrice
        if (
            upstream.ok &&
            Array.isArray(data.storageOptions) &&
            data.storageOptions.length > 0
        ) {
            const minPrice = Math.min(...data.storageOptions.map(s => s.price))
            if (minPrice !== data.basePrice) {
                res.status(upstream.status).json({ ...data, basePrice: minPrice })
                return
            }
        }

        res.status(upstream.status).json(data)
    } catch (err) {
        next(err)
    }
})

export default router
