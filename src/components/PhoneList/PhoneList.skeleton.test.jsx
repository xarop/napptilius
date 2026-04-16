import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}))

vi.mock('../SearchBar/SearchBar', () => ({
  default: () => <div data-testid="search-bar" />,
}))

// Base context – overridden per test
let mockContext = {
  filteredPhones: [],
  loading: false,
  error: null,
  searchQuery: '',
  fetchPhones: vi.fn(),
}

vi.mock('../../context/PhoneContext', () => ({
  usePhones: () => mockContext,
}))

import PhoneList from './PhoneList'

function renderList() {
  return render(
    <MemoryRouter>
      <PhoneList />
    </MemoryRouter>
  )
}

describe('PhoneList – skeleton loading', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows skeleton cards while loading', () => {
    mockContext = { ...mockContext, loading: true }
    renderList()
    // SkeletonCard elements are divs with no text, the list wrapper has aria-busy
    const wrapper = screen.getByRole('region', { hidden: true })
    expect(wrapper).toHaveAttribute('aria-busy', 'true')
  })

  it('does NOT show slow-connection notice before 6 s', () => {
    mockContext = { ...mockContext, loading: true }
    renderList()
    act(() => { vi.advanceTimersByTime(5999) })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows slow-connection notice after 6 s', () => {
    mockContext = { ...mockContext, loading: true }
    renderList()
    act(() => { vi.advanceTimersByTime(6000) })
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status').textContent).toBe('home.slowConnection')
  })

  it('clears slow-connection notice when loading finishes', () => {
    mockContext = { ...mockContext, loading: true }
    const { rerender } = render(
      <MemoryRouter>
        <PhoneList />
      </MemoryRouter>
    )
    act(() => { vi.advanceTimersByTime(6000) })
    expect(screen.getByRole('status')).toBeInTheDocument()

    mockContext = {
      ...mockContext,
      loading: false,
      filteredPhones: [
        { id: 'P1', brand: 'Apple', name: 'iPhone 15', basePrice: 799, imageUrl: 'a.webp' },
      ],
    }
    rerender(
      <MemoryRouter>
        <PhoneList />
      </MemoryRouter>
    )
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
