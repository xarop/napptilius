import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'
import phonesApi from '../../services/api'
import SimilarItems from '../../components/SimilarItems/SimilarItems'
import {
  PageWrapper,
  BackLink,
  ProductLayout,
  ImageSection,
  InfoSection,
  TitleBlock,
  Brand,
  PhoneName,
  PriceTag,
  Divider,
  SectionLabel,
  ColorOptions,
  ColorSwatch,
  ColorName,
  StorageOptions,
  StorageButton,
  AddToCartButton,
  SpecsTable,
  SkeletonImage,
  SkeletonLine,
  SkeletonButton,
  SkeletonSwatch,
  SkeletonRow,
} from './DetailPage.styled'

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

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    phonesApi
      .getById(id)
      .then(data => {
        if (cancelled) return
        setPhone(data)
        setSelectedColor(data.colorOptions?.[0]?.hexCode ?? null)
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
    const price = storageOption?.price ?? phone.basePrice
    const colorOption = phone.colorOptions?.find(c => c.hexCode === selectedColor)

    addItem({
      id: phone.id,
      name: phone.name,
      brand: phone.brand,
      imageUrl: colorOption?.imageUrl ?? phone.colorOptions?.[0]?.imageUrl,
      price,
      selectedColor,
      selectedColorName: colorOption?.name ?? null,
      selectedStorage,
    })

    navigate('/cart')
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
        <ProductLayout>
          <SkeletonImage />
          <InfoSection>
            <TitleBlock>
              <SkeletonLine $h="14px" $w="60px" $mb="10px" />
              <SkeletonLine $h="22px" $w="75%" $mb="12px" />
              <SkeletonLine $h="18px" $w="100px" />
            </TitleBlock>
            <Divider />
            <div>
              <SkeletonLine $h="12px" $w="200px" $mb="12px" />
              <SkeletonRow>
                <SkeletonButton />
                <SkeletonButton />
                <SkeletonButton />
              </SkeletonRow>
            </div>
            <div>
              <SkeletonLine $h="12px" $w="160px" $mb="12px" />
              <SkeletonRow>
                <SkeletonSwatch />
                <SkeletonSwatch />
                <SkeletonSwatch />
                <SkeletonSwatch />
              </SkeletonRow>
            </div>
            <SkeletonLine $h="52px" $w="100%" />
          </InfoSection>
        </ProductLayout>
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
    phone.storageOptions?.find(s => s.capacity === selectedStorage)?.price ?? phone.basePrice

  const currentImageUrl =
    phone.colorOptions?.find(c => c.hexCode === selectedColor)?.imageUrl ??
    phone.colorOptions?.[0]?.imageUrl

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
            src={currentImageUrl}
            alt={t('accessibility.phoneImage', { name: phone.name })}
            onError={e => {
              e.target.style.display = 'none'
            }}
          />
        </ImageSection>

        <InfoSection>
          <TitleBlock>
            <Brand>{phone.brand}</Brand>
            <PhoneName>{phone.name}</PhoneName>
            <PriceTag>{!selectedStorage && `${t('common.from')} `}{currentPrice} EUR</PriceTag>
          </TitleBlock>

          <Divider />

          {phone.storageOptions?.length > 0 && (
            <div>
              <SectionLabel>{t('detail.storageQuestion')}</SectionLabel>
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

          {phone.colorOptions?.length > 0 && (
            <div>
              <SectionLabel>{t('detail.colorQuestion')}</SectionLabel>
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
              {selectedColor && (
                <ColorName>
                  {phone.colorOptions.find(c => c.hexCode === selectedColor)?.name}
                </ColorName>
              )}
            </div>
          )}

          <AddToCartButton
            onClick={handleAddToCart}
            disabled={(!selectedStorage && phone.storageOptions?.length > 0) || (!selectedColor && phone.colorOptions?.length > 0)}
            aria-label={t('detail.addToCart')}
          >
            {t('detail.addToCart')}
          </AddToCartButton>
        </InfoSection>
      </ProductLayout>

      {specs.length > 0 && (
        <SpecsTable aria-label={t('detail.specs')}>
          <h2>{t('detail.specs')}</h2>
          <dl>
            {specs.map(s => (
              <div key={s.key}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </SpecsTable>
      )}

      <SimilarItems currentId={phone.id} currentPrice={currentPrice} />
    </PageWrapper>
  )
}

export default DetailPage
