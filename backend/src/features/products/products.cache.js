/**
 * In-memory cache for product list responses.
 * Key: serialised query params. Value: cached payload + expiry timestamp.
 * TTL: 5 minutes (matches typical upstream cache window).
 */
const TTL_MS = 5 * 60 * 1000

const cache = new Map()

export const getCachedProducts = key => {
    const entry = cache.get(key)
    if (!entry) return undefined
    if (Date.now() > entry.expiresAt) {
        cache.delete(key)
        return undefined
    }
    return entry.data
}

export const setCachedProducts = (key, data) => {
    cache.set(key, { data, expiresAt: Date.now() + TTL_MS })
}

export const clearProductsCache = () => cache.clear()
