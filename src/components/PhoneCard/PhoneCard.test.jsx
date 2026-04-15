import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import PhoneCard from './PhoneCard'

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    i18n: { language: 'en' },
  }),
}))

const mockPhone = {
  id: 'APPLE-IPHONE-15',
  brand: 'Apple',
  name: 'iPhone 15',
  basePrice: 799,
  imageUrl: 'https://example.com/APPLE-IPHONE-15.jpg',
}

function renderCard(phone = mockPhone) {
  return render(
    <MemoryRouter>
      <PhoneCard phone={phone} />
    </MemoryRouter>
  )
}

describe('PhoneCard', () => {
  it('renders phone brand', () => {
    renderCard()
    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('renders phone name', () => {
    renderCard()
    expect(screen.getByText('iPhone 15')).toBeInTheDocument()
  })

  it('renders phone price with EUR', () => {
    renderCard()
    expect(screen.getByText('799 EUR')).toBeInTheDocument()
  })

  it('links to detail page', () => {
    renderCard()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/phones/APPLE-IPHONE-15')
  })

  it('renders phone image', () => {
    renderCard()
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('loading', 'lazy')
  })
})
