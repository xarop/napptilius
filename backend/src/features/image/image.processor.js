import sharp from 'sharp'
import { getCached, setCached, hasCached } from './image.cache.js'

// ── White-background removal ───────────────────────────────────────────────

/**
 * BFS flood-fill from every edge pixel.
 * Any border pixel whose R, G, B values are all >= threshold is considered
 * background and its alpha channel is set to 0 (transparent).
 * Returns the modified raw RGBA buffer.
 *
 * @param {Buffer} data     Raw RGBA pixel data from Sharp
 * @param {number} width
 * @param {number} height
 * @param {number} threshold  Pixels with R,G,B >= threshold are background (default 240)
 * @returns {Buffer}
 */
const removeWhiteBackground = (data, width, height, threshold = 240) => {
    const pixels = new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength)
    const visited = new Uint8Array(width * height)

    const isBackground = pos => {
        const i = pos * 4
        return pixels[i] >= threshold && pixels[i + 1] >= threshold && pixels[i + 2] >= threshold
    }

    // Seed the queue with all border pixels
    const queue = []
    for (let x = 0; x < width; x++) {
        queue.push(x)
        queue.push((height - 1) * width + x)
    }
    for (let y = 1; y < height - 1; y++) {
        queue.push(y * width)
        queue.push(y * width + (width - 1))
    }

    while (queue.length > 0) {
        const pos = queue.pop()
        if (visited[pos] || !isBackground(pos)) continue
        visited[pos] = 1
        pixels[pos * 4 + 3] = 0 // make transparent
        const x = pos % width
        const y = Math.floor(pos / width)
        if (x > 0) queue.push(pos - 1)
        if (x < width - 1) queue.push(pos + 1)
        if (y > 0) queue.push(pos - width)
        if (y < height - 1) queue.push(pos + width)
    }

    return Buffer.from(pixels.buffer, pixels.byteOffset, pixels.byteLength)
}

// ── Concurrency limiter ────────────────────────────────────────────────────

/**
 * Limits concurrent Sharp operations to avoid saturating libuv's thread pool
 * (default size 4), which would delay all async I/O including upstream API calls.
 */
const MAX_CONCURRENT_SHARP = 3
let activeSharp = 0
const sharpQueue = []

const acquireSharpSlot = () =>
    new Promise(resolve => {
        if (activeSharp < MAX_CONCURRENT_SHARP) {
            activeSharp++
            resolve()
        } else {
            sharpQueue.push(() => {
                activeSharp++
                resolve()
            })
        }
    })

const releaseSharpSlot = () => {
    activeSharp--
    const next = sharpQueue.shift()
    if (next) next()
}

// ── Main processor ─────────────────────────────────────────────────────────

/**
 * Downloads an image URL, removes its white background, trims transparent
 * space, resizes to 400 px tall and converts to WebP quality 85.
 * Result is cached in the LRU cache (50 entries).
 *
 * @param {string} url  Original image URL (must be HTTPS)
 * @returns {Promise<Buffer>}  Processed WebP buffer
 */
export const processImage = async url => {
    const cached = getCached(url)
    if (cached) return cached

    const upstream = await fetch(url)
    if (!upstream.ok) throw new Error(`Failed to fetch image: ${upstream.status}`)

    const buffer = Buffer.from(await upstream.arrayBuffer())

    await acquireSharpSlot()
    try {
        // Step 1 – decode to raw RGBA pixels
        const { data, info } = await sharp(buffer)
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true })

        // Step 2 – remove white background via BFS flood-fill
        const cleaned = removeWhiteBackground(data, info.width, info.height)

        // Step 3 – trim, resize and encode as WebP
        const processed = await sharp(cleaned, {
            raw: { width: info.width, height: info.height, channels: 4 },
        })
            .trim()
            .resize({ height: 400, withoutEnlargement: false })
            .webp({ quality: 85 })
            .toBuffer()

        setCached(url, processed)
        return processed
    } finally {
        releaseSharpSlot()
    }
}

// ── Background preloader ───────────────────────────────────────────────────

/**
 * Fire-and-forget: processes a list of image URLs in the background so they
 * are warm in the cache before the browser requests them.
 * Skips URLs already cached. Concurrency capped at 3 to limit peak RAM usage.
 *
 * @param {string[]} urls
 */
const PRELOAD_CONCURRENCY = 3

export const preloadImages = urls => {
    const pending = urls.filter(url => !hasCached(url))
    if (pending.length === 0) return

    const queue = [...pending]

    const worker = async () => {
        while (queue.length > 0) {
            const url = queue.shift()
            await processImage(url).catch(() => {
                // Silently ignore preload errors — the image route will retry on demand
            })
        }
    }

    const concurrency = Math.min(PRELOAD_CONCURRENCY, pending.length)
    for (let i = 0; i < concurrency; i++) {
        worker()
    }
}
