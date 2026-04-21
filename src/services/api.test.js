import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import phonesApi, { _resetCache, _http } from './api'

const mockPhones = [
  { id: 'APPLE-IPHONE-15', brand: 'Apple', name: 'iPhone 15', price: 799 },
  { id: 'SMG-S24', brand: 'Samsung', name: 'Galaxy S24', price: 699 },
]

beforeEach(() => {
  _resetCache()
  vi.spyOn(_http, 'fetch')
  _http.fetch.mockReset()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('phonesApi', () => {
  it('getAll fetches phones from the API', async () => {
    _http.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPhones,
    })

    const result = await phonesApi.getAll()
    expect(result).toEqual(mockPhones)
    expect(_http.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products'),
      expect.any(Object)
    )
  })

  it('getAll passes search param to the API endpoint', async () => {
    _http.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [mockPhones[0]],
    })

    const result = await phonesApi.getAll('apple')
    expect(result).toEqual([mockPhones[0]])
    expect(_http.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products?search=apple'),
      expect.any(Object)
    )
  })

  it('getById fetches a single phone', async () => {
    const detail = { ...mockPhones[0], specs: {}, colorOptions: [], storageOptions: [] }
    _http.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => detail,
    })

    const result = await phonesApi.getById('APPLE-IPHONE-15')
    expect(result).toEqual(detail)
    expect(_http.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products/APPLE-IPHONE-15'),
      expect.any(Object)
    )
  })

  it('throws on non-ok response', async () => {
    // In BFF mode (isBFF=true from .env), a non-ok response triggers a fallback
    // to the upstream. We mock both calls to return 404, which causes the final throw.
    _http.fetch
      .mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' })
      .mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' })
    await expect(phonesApi.getById('INVALID')).rejects.toThrow('API error: 404')
  })
})
