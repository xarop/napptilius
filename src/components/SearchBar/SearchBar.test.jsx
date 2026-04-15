import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from './SearchBar'

const mockSetSearchQuery = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}))

vi.mock('../../context/PhoneContext', () => ({
  usePhones: () => ({
    searchQuery: '',
    setSearchQuery: mockSetSearchQuery,
  }),
}))

describe('SearchBar', () => {
  it('renders search input', () => {
    render(<SearchBar />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('has correct placeholder', () => {
    render(<SearchBar />)
    expect(screen.getByRole('searchbox')).toHaveAttribute('placeholder', 'search.placeholder')
  })

  it('calls setSearchQuery on input', async () => {
    render(<SearchBar />)
    const input = screen.getByRole('searchbox')
    await userEvent.type(input, 'iPhone')
    expect(mockSetSearchQuery).toHaveBeenCalled()
  })
})
