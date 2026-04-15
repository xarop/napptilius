import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { usePhones } from '../../context/PhoneContext'
import PhoneCard from '../PhoneCard/PhoneCard'
import { SIMILAR_ITEMS_CONFIG } from './SimilarItems.config'
import { Section, Heading, Strip, StripItem } from './SimilarItems.styled'

function SimilarItems({ currentId, currentPrice }) {
  const { t } = useTranslation()
  const { phones } = usePhones()

  const { PRICE_RANGE_PERCENT, MAX_ITEMS } = SIMILAR_ITEMS_CONFIG
  const lo = currentPrice * (1 - PRICE_RANGE_PERCENT)
  const hi = currentPrice * (1 + PRICE_RANGE_PERCENT)

  const similar = phones
    .filter(p => p.id !== currentId && p.basePrice >= lo && p.basePrice <= hi)
    .slice(0, MAX_ITEMS)

  if (similar.length === 0) return null

  return (
    <Section aria-label={t('detail.similarItems')}>
      <Heading>{t('detail.similarItems')}</Heading>
      <Strip role="list">
        {similar.map(phone => (
          <StripItem key={phone.id} role="listitem">
            <PhoneCard phone={phone} />
          </StripItem>
        ))}
      </Strip>
    </Section>
  )
}

SimilarItems.propTypes = {
  currentId: PropTypes.string.isRequired,
  currentPrice: PropTypes.number.isRequired,
}

export default SimilarItems
