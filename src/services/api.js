/**
 * API base URL.
 * - Leave unset (or set to the upstream URL) for standalone / GitHub Pages.
 * - Set VITE_API_BASE_URL=/api to route calls through the local BFF backend,
 *   which hides the API key and processes images via Sharp.
 * When the BFF is unavailable, calls automatically fall back to the upstream.
 */
const UPSTREAM_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'
const UPSTREAM_KEY = import.meta.env.VITE_API_KEY || '87909682e6cd74208f41a6ef39fe4191'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || UPSTREAM_URL

// Only attach the API key when calling the upstream directly (not the BFF).
const isBFF = BASE_URL.startsWith('/')
const API_KEY = isBFF ? null : UPSTREAM_KEY

const CACHE_TTL = 60 * 60 * 1000 // 1 hour in ms
const cache = new Map()

function getCached(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  return entry.data
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() })
}

async function request(endpoint) {
  const cacheKey = endpoint
  const cached = getCached(cacheKey)
  if (cached) return cached

  const headers = { 'Content-Type': 'application/json' }
  if (API_KEY) headers['x-api-key'] = API_KEY

  let response
  try {
    response = await fetch(`${BASE_URL}${endpoint}`, { headers })
  } catch {
    // BFF unreachable – fall back to upstream
    if (isBFF) {
      response = await fetch(`${UPSTREAM_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json', 'x-api-key': UPSTREAM_KEY },
      })
    } else {
      throw new Error('Network error')
    }
  }

  if (!response.ok) {
    // BFF returned an error – fall back to upstream
    if (isBFF) {
      const fallback = await fetch(`${UPSTREAM_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json', 'x-api-key': UPSTREAM_KEY },
      })
      if (!fallback.ok) throw new Error(`API error: ${fallback.status} ${fallback.statusText}`)
      const data = await fallback.json()
      setCache(cacheKey, data)
      return data
    }
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  setCache(cacheKey, data)
  return data
}

export const phonesApi = {
  getAll: () => request('/products').then(data => {
    const seen = new Set()
    return data.filter(p => {
      if (seen.has(p.id)) return false
      seen.add(p.id)
      return true
    })
  }),
  getById: id => request(`/products/${id}`),
}

export default phonesApi
