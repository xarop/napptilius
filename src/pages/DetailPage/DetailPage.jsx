import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'
import phonesApi from '../../services/api'
import {
  PageWrapper,
  BackLink,
  ProductLayout,
  ImageSection,
  InfoSection,
  Brand,
  PhoneName,
  PriceTag,
  Divider,
  SectionLabel,
  ColorOptions,
  ColorSwatch,
  StorageOptions,
  StorageButton,
  AddToCartButton,
  SpecsTable,
  Feedback,
} from './DetailPage.styled'

const IMG_BASE = 'https://itx-frontend-test.onrender.com/api/images'

function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  )
}

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { addItem } = useCart()

  const [phone, setPhone] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedStorage, setSelectedStorage] = useState(null)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    phonesApi
      .getById(id)
      .then(data => {
        if (cancelled) return
        setPhone(data)
        if (data.colorOptions?.length) setSelectedColor(data.colorOptions[0].hexCode)
        if (data.storageOptions?.length) {
          setSelectedStorage(data.storageOptions[0].capacity)
        }
      })
      .catch(err => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  function handleAddToCart() {
    if (!phone) return
    const storageOption = phone.storageOptions?.find(s => s.capacity === selectedStorage)
    const price = storageOption?.price ?? phone.price

    addItem({
      id: phone.id,
      name: phone.name,
      brand: phone.brand,
      imageFileName: phone.imageFileName,
      price,
      selectedColor,
      selectedStorage,
    })

    setFeedback(t('cart.added', { name: phone.name }))
    setTimeout(() => setFeedback(''), 3000)
  }

  const specs = phone?.specs
    ? [
        { key: 'screen', label: t('detail.screen'), value: phone.specs.screen },
        { key: 'resolution', label: t('detail.resolution'), value: phone.specs.resolution },
        { key: 'processor', label: t('detail.processor'), value: phone.specs.processor },
        { key: 'mainCamera', label: t('detail.mainCamera'), value: phone.specs.mainCamera },
        { key: 'selfieCamera', label: t('detail.selfieCamera'), value: phone.specs.selfieCamera },
        { key: 'battery', label: t('detail.battery'), value: phone.specs.battery },
        { key: 'os', label: t('detail.os'), value: phone.specs.os },
        {
          key: 'screenRefreshRate',
          label: t('detail.screenRefreshRate'),
          value: phone.specs.screenRefreshRate,
        },
      ].filter(s => s.value)
    : []

  if (loading) {
    return (
      <PageWrapper aria-busy="true">
        <p>{t('detail.loading')}</p>
      </PageWrapper>
    )
  }

  if (error || !phone) {
    return (
      <PageWrapper>
        <p role="alert">{t('detail.error')}</p>
        <BackLink onClick={() => navigate(-1)}>
          <BackIcon /> {t('detail.back')}
        </BackLink>
      </PageWrapper>
    )
  }

  const currentPrice =
    phone.storageOptions?.find(s => s.capacity === selectedStorage)?.price ?? phone.price

  return (
    <PageWrapper id="main-content">
      <BackLink
        role="link"
        tabIndex={0}
        onClick={() => navigate(-1)}
        onKeyDown={e => e.key === 'Enter' && navigate(-1)}
        aria-label={t('detail.back')}
      >
        <BackIcon />
        {t('detail.back')}
      </BackLink>

      <ProductLayout>
        <ImageSection>
          <img
            src={`${IMG_BASE}/${phone.imageFileName}`}
            alt={t('accessibility.phoneImage', { name: phone.name })}
            onError={e => {
              e.target.style.display = 'none'
            }}
          />
        </ImageSection>

        <InfoSection>
          <div>
            <Brand>{phone.brand}</Brand>
            <PhoneName>{phone.name}</PhoneName>
            <PriceTag>{currentPrice} EUR</PriceTag>
          </div>

          <Divider />

          {phone.colorOptions?.length > 0 && (
            <div>
              <SectionLabel>{t('detail.color')}</SectionLabel>
              <ColorOptions role="group" aria-label={t('detail.color')}>
                {phone.colorOptions.map(c => (
                  <ColorSwatch
                    key={c.hexCode}
                    $color={c.hexCode}
                    $selected={selectedColor === c.hexCode}
                    onClick={() => setSelectedColor(c.hexCode)}
                    aria-label={t('accessibility.colorOption', { name: c.name })}
                    aria-pressed={selectedColor === c.hexCode}
                    title={c.name}
                  />
                ))}
              </ColorOptions>
            </div>
          )}

          {phone.storageOptions?.length > 0 && (
            <div>
              <SectionLabel>{t('detail.storage')}</SectionLabel>
              <StorageOptions role="group" aria-label={t('detail.storage')}>
                {phone.storageOptions.map(s => (
                  <StorageButton
                    key={s.capacity}
                    $selected={selectedStorage === s.capacity}
                    onClick={() => setSelectedStorage(s.capacity)}
                    aria-label={t('accessibility.storageOption', { capacity: s.capacity })}
                    aria-pressed={selectedStorage === s.capacity}
                  >
                    {s.capacity}
                  </StorageButton>
                ))}
              </StorageOptions>
            </div>
          )}

          <AddToCartButton
            onClick={handleAddToCart}
            disabled={!selectedColor && phone.colorOptions?.length > 0}
            aria-label={t('detail.addToCart')}
          >
            {t('detail.addToCart')}
          </AddToCartButton>

          <Feedback aria-live="polite" aria-atomic="true">
            {feedback}
          </Feedback>
        </InfoSection>
      </ProductLayout>

      {specs.length > 0 && (
        <SpecsTable aria-label={t('detail.specs')}>
          <h2>{t('detail.specs')}</h2>
          <dl>
            {specs.map(s => (
              <>
                <dt key={`dt-${s.key}`}>{s.label}</dt>
                <dd key={`dd-${s.key}`}>{s.value}</dd>
              </>
            ))}
          </dl>
        </SpecsTable>
      )}
    </PageWrapper>
  )
}

export default DetailPage
