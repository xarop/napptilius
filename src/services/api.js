const BASE_URL = 'https://itx-frontend-test.onrender.com/api'
const API_KEY = import.meta.env.VITE_API_KEY || ''

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

  const response = await fetch(`${BASE_URL}${endpoint}`, { headers })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  setCache(cacheKey, data)
  return data
}

export const phonesApi = {
  getAll: () => request('/phones'),
  getById: id => request(`/phones/${id}`),
}

export default phonesApi
