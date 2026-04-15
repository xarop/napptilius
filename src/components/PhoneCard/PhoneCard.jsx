import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Card, ImageWrapper, CardBody, Brand, NamePriceRow, Name, Price } from './PhoneCard.styled'

function PhoneCard({ phone }) {
  const { t } = useTranslation()
  const { id, brand, name, basePrice, imageUrl } = phone

  return (
    <Card to={`/phones/${id}`} aria-label={`${brand} ${name} – ${t('common.from')} ${basePrice} EUR`}>
      <ImageWrapper>
        <img
          src={imageUrl}
          alt={t('accessibility.phoneImage', { name })}
          loading="lazy"
          onError={e => {
            e.target.style.display = 'none'
          }}
        />
      </ImageWrapper>
      <CardBody>
        <Brand>{brand}</Brand>
        <NamePriceRow>
          <Name>{name}</Name>
          <Price>{t('common.from')} {basePrice} EUR</Price>
        </NamePriceRow>
      </CardBody>
    </Card>
  )
}

PhoneCard.propTypes = {
  phone: PropTypes.shape({
    id: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    basePrice: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
}

export default PhoneCard
