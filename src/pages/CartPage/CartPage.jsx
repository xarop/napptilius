import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'
import { useFormatPrice } from '../../hooks/useFormatPrice'
import {
  PageWrapper,
  Title,
  ItemsList,
  CartItem,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemVariant,
  ColorSwatch,
  QtyControl,
  QtyButton,
  QtyValue,
  ItemPrice,
  RemoveButton,
  Footer,
  ContinueButton,
  TotalSection,
  TotalLabel,
  TotalPrice,
  PayButton,
} from './CartPage.styled'

function CartPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, totalItems, totalPrice, removeItem, incrementItem, decrementItem } = useCart()
  const formatPrice = useFormatPrice()

  return (
    <>
      <PageWrapper id="main-content">
        <Title>
          {t('cart.title')} ({totalItems})
        </Title>

        <ItemsList>
          {items.map((item, index) => (
            <CartItem
              key={`${item.id}-${item.selectedStorage}-${item.selectedColor}-${index}`}
            >
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
                <ItemName>{item.name}</ItemName>
                <ItemVariant>
                  {item.selectedStorage}
                  {item.selectedColor && (
                    <>
                      <ColorSwatch $color={item.selectedColor} aria-hidden="true" />
                      {item.selectedColorName && item.selectedColorName}
                    </>
                  )}
                </ItemVariant>
                <QtyControl>
                  <QtyButton
                    onClick={() => decrementItem(index)}
                    aria-label={`${t('cart.decrease')} ${item.name}`}
                  >
                    −
                  </QtyButton>
                  <QtyValue>{item.quantity}</QtyValue>
                  <QtyButton
                    onClick={() => incrementItem(index)}
                    aria-label={`${t('cart.increase')} ${item.name}`}
                  >
                    +
                  </QtyButton>
                </QtyControl>
                <ItemPrice>{formatPrice(item.price * item.quantity)}</ItemPrice>
                <RemoveButton
                  onClick={() => removeItem(index)}
                  aria-label={`${t('cart.remove')} ${item.name}`}
                >
                  {t('cart.remove')}
                </RemoveButton>
              </ItemInfo>
            </CartItem>
          ))}
        </ItemsList>
      </PageWrapper>

      <Footer>
        <ContinueButton to="/">{t('cart.continueShopping')}</ContinueButton>
        {items.length > 0 && (
          <>
            <TotalSection>
              <TotalLabel>{t('cart.total')}</TotalLabel>
              <TotalPrice>{formatPrice(totalPrice)}</TotalPrice>
            </TotalSection>
            <PayButton aria-label={t('cart.pay')} onClick={() => navigate('/order-confirmation')}>{t('cart.pay')}</PayButton>
          </>
        )}
      </Footer>
    </>
  )
}

export default CartPage
