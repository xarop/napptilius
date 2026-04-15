import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, opts) => (opts ? `${key}:${JSON.stringify(opts)}` : key),
  }),
}))

const mockContext = {
  filteredPhones: [
    { id: 'APPLE-IPHONE-15', brand: 'Apple', name: 'iPhone 15', price: 799, imageFileName: 'a.jpg' },
    { id: 'SMG-S24', brand: 'Samsung', name: 'Galaxy S24', price: 699, imageFileName: 'b.jpg' },
  ],
  loading: false,
  error: null,
  searchQuery: '',
  fetchPhones: vi.fn(),
}

vi.mock('../../context/PhoneContext', () => ({
  usePhones: () => mockContext,
}))

import PhoneList from './PhoneList'

describe('PhoneList', () => {
  it('renders all phone cards', () => {
    render(
      <MemoryRouter>
        <PhoneList />
      </MemoryRouter>
    )
    expect(screen.getByText('iPhone 15')).toBeInTheDocument()
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument()
  })

  it('shows result count info', () => {
    render(
      <MemoryRouter>
        <PhoneList />
      </MemoryRouter>
    )
    // ResultsInfo renders count via t()
    expect(screen.getByText(/search\.results/)).toBeInTheDocument()
  })

  it('renders a grid list', () => {
    render(
      <MemoryRouter>
        <PhoneList />
      </MemoryRouter>
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
  })
})
