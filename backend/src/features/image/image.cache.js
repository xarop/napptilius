/**
 * LRU in-memory cache for processed image buffers.
 * Key: original image URL. Value: processed WebP Buffer.
 * Capped at MAX_ENTRIES to bound memory usage.
 * Map insertion order is used as a simple LRU proxy: on each read the entry
 * is moved to the end, and when the limit is exceeded the oldest is evicted.
 */
const MAX_ENTRIES = 50

const cache = new Map()

export const getCached = url => {
    const buf = cache.get(url)
    if (buf === undefined) return undefined
    // Refresh LRU position
    cache.delete(url)
    cache.set(url, buf)
    return buf
}

export const setCached = (url, buffer) => {
    if (cache.has(url)) cache.delete(url)
    cache.set(url, buffer)
    if (cache.size > MAX_ENTRIES) {
        cache.delete(cache.keys().next().value)
    }
}

export const hasCached = url => cache.has(url)

export const clearCache = () => cache.clear()
