import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}))

vi.mock('../../context/CartContext', () => ({
  useCart: () => ({ addItem: vi.fn() }),
}))

vi.mock('../../components/SimilarItems/SimilarItems', () => ({
  default: () => null,
}))

import phonesApi from '../../services/api'
import DetailPage from './DetailPage'

vi.mock('../../services/api', () => ({
  default: {
    getById: vi.fn(),
  },
}))

const mockPhone = {
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  basePrice: 1329,
  description: 'A flagship phone',
  rating: 4.6,
  specs: { screen: '6.8"', resolution: '3120x1440', processor: 'SD8 Gen3', battery: '5000mAh', os: 'Android 14', mainCamera: '200MP', selfieCamera: '12MP', screenRefreshRate: '120Hz' },
  colorOptions: [{ name: 'Black', hexCode: '#000000', imageUrl: 'black.webp' }],
  storageOptions: [
    { capacity: '256 GB', price: 1229 },
    { capacity: '512 GB', price: 1329 },
  ],
  similarProducts: [],
}

function renderDetailPage(id = 'SMG-S24U') {
  return render(
    <MemoryRouter initialEntries={[`/phones/${id}`]}>
      <Routes>
        <Route path="/phones/:id" element={<DetailPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('DetailPage – skeleton loading', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders skeleton (aria-busy) while fetching', () => {
    // Never resolves during this test
    phonesApi.getById.mockReturnValue(new Promise(() => {}))
    renderDetailPage()
    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true')
  })

  it('skeleton disappears and product renders after fetch resolves', async () => {
    phonesApi.getById.mockResolvedValue(mockPhone)
    renderDetailPage()

    // Initially loading
    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true')

    // After data arrives
    await waitFor(() =>
      expect(screen.queryByRole('main')).not.toHaveAttribute('aria-busy', 'true')
    )
    expect(screen.getByText('Samsung')).toBeInTheDocument()
    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('shows error state on fetch failure', async () => {
    phonesApi.getById.mockRejectedValue(new Error('API error: 404 Not Found'))
    renderDetailPage()

    await waitFor(() =>
      expect(screen.getByRole('alert')).toBeInTheDocument()
    )
    expect(screen.getByRole('alert').textContent).toBe('detail.error')
  })
})
