import { describe, it, expect, vi, beforeEach } from 'vitest'
import phonesApi from './api'

const mockPhones = [
  { id: 'APPLE-IPHONE-15', brand: 'Apple', name: 'iPhone 15', price: 799 },
  { id: 'SMG-S24', brand: 'Samsung', name: 'Galaxy S24', price: 699 },
]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

describe('phonesApi', () => {
  it('getAll fetches phones from the API', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPhones,
    })

    const result = await phonesApi.getAll()
    expect(result).toEqual(mockPhones)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products'),
      expect.any(Object)
    )
  })

  it('getById fetches a single phone', async () => {
    const detail = { ...mockPhones[0], specs: {}, colorOptions: [], storageOptions: [] }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => detail,
    })

    const result = await phonesApi.getById('APPLE-IPHONE-15')
    expect(result).toEqual(detail)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products/APPLE-IPHONE-15'),
      expect.any(Object)
    )
  })

  it('throws on non-ok response', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' })
    await expect(phonesApi.getById('INVALID')).rejects.toThrow('API error: 404')
  })
})
