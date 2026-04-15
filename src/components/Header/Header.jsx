import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import SearchBar from '../SearchBar/SearchBar'
import LanguageSelector from '../LanguageSelector/LanguageSelector'
import CartDrawer from '../Cart/CartDrawer'
import { useState } from 'react'
import { StyledHeader, HeaderInner, Logo, Actions, CartButton, CartBadge } from './Header.styled'

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
      />
    </svg>
  )
}

function Header() {
  const { t } = useTranslation()
  const { totalItems } = useCart()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <StyledHeader>
        <HeaderInner>
          <Logo as={Link} to="/" aria-label={t('accessibility.logo')}>
            {t('header.title')}
          </Logo>

          <SearchBar />

          <Actions>
            <LanguageSelector />

            <CartButton
              onClick={() => setCartOpen(true)}
              aria-label={`${t('accessibility.cartIcon')} – ${t('header.cartItems', { count: totalItems })}`}
            >
              <CartIcon />
              {totalItems > 0 && <CartBadge aria-hidden="true">{totalItems}</CartBadge>}
            </CartButton>
          </Actions>
        </HeaderInner>
      </StyledHeader>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

export default Header
