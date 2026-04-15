import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'
import {
  Overlay,
  Drawer,
  DrawerHeader,
  CloseButton,
  DrawerBody,
  EmptyCart,
  CartItem,
  ItemImage,
  ItemInfo,
  RemoveButton,
  DrawerFooter,
  TotalRow,
} from './CartDrawer.styled'

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

function CartDrawer({ isOpen, onClose }) {
  const { t } = useTranslation()
  const { items, totalItems, totalPrice, removeItem } = useCart()
  const closeRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <>
      <Overlay $open={isOpen} onClick={onClose} aria-hidden="true" />

      <Drawer
        $open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label={t('cart.title')}
        aria-hidden={!isOpen}
      >
        <DrawerHeader>
          <h2>
            {t('cart.title')}
            {totalItems > 0 && ` (${t('header.cartItems', { count: totalItems })})`}
          </h2>
          <CloseButton
            ref={closeRef}
            onClick={onClose}
            aria-label={t('accessibility.closeCart')}
          >
            <CloseIcon />
          </CloseButton>
        </DrawerHeader>

        <DrawerBody>
          {items.length === 0 ? (
            <EmptyCart>{t('cart.empty')}</EmptyCart>
          ) : (
            items.map((item, index) => (
              <CartItem key={`${item.id}-${item.selectedColor}-${item.selectedStorage}-${index}`}>
                <ItemImage>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    onError={e => {
                      e.target.style.display = 'none'
                    }}
                  />
                </ItemImage>
                <ItemInfo>
                  <strong>{item.name}</strong>
                  {item.selectedColor && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: item.selectedColor,
                          border: '1px solid #ccc',
                          display: 'inline-block',
                        }}
                      />
                      {item.selectedStorage}
                    </span>
                  )}
                  <p>{item.price} EUR × {item.quantity}</p>
                  <RemoveButton onClick={() => removeItem(index)} aria-label={`${t('cart.remove')} ${item.name}`}>
                    {t('cart.remove')}
                  </RemoveButton>
                </ItemInfo>
              </CartItem>
            ))
          )}
        </DrawerBody>

        {items.length > 0 && (
          <DrawerFooter>
            <TotalRow>
              <span>{t('cart.total')}</span>
              <span>{totalPrice} EUR</span>
            </TotalRow>
          </DrawerFooter>
        )}
      </Drawer>
    </>
  )
}

CartDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CartDrawer
