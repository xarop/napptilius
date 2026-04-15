import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Card, ImageWrapper, CardBody, Brand, Name, Price } from './PhoneCard.styled'

const IMG_BASE = 'https://itx-frontend-test.onrender.com/api/images'

function PhoneCard({ phone }) {
  const { t } = useTranslation()
  const { id, brand, name, price, imageFileName } = phone

  return (
    <Card to={`/phones/${id}`} aria-label={`${brand} ${name} – ${price} EUR`}>
      <ImageWrapper>
        <img
          src={`${IMG_BASE}/${imageFileName}`}
          alt={t('accessibility.phoneImage', { name })}
          loading="lazy"
          onError={e => {
            e.target.style.display = 'none'
          }}
        />
      </ImageWrapper>
      <CardBody>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>
        <Price>{price} EUR</Price>
      </CardBody>
    </Card>
  )
}

PhoneCard.propTypes = {
  phone: PropTypes.shape({
    id: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageFileName: PropTypes.string.isRequired,
  }).isRequired,
}

export default PhoneCard
