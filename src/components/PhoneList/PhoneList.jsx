import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { usePhones } from '../../context/PhoneContext'
import PhoneCard from '../PhoneCard/PhoneCard'
import SearchBar from '../SearchBar/SearchBar'
import {
  ListWrapper,
  SearchSection,
  ResultsInfo,
  Grid,
  NoResults,
  LoadingWrapper,
  SkeletonCard,
  SlowNotice,
  ErrorWrapper,
  LoadMoreWrapper,
  LoadMoreButton,
} from './PhoneList.styled'

const SKELETON_COUNT = 10
const SLOW_THRESHOLD_MS = 6000
const PAGE_SIZE = 20

function PhoneList() {
  const { t } = useTranslation()
  const { filteredPhones, loading, error, searchQuery, fetchPhones } = usePhones()
  const [isSlow, setIsSlow] = useState(false)
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const [animationParent] = useAutoAnimate()

  useEffect(() => {
    if (!loading) {
      setIsSlow(false)
      return
    }
    const timer = setTimeout(() => setIsSlow(true), SLOW_THRESHOLD_MS)
    return () => clearTimeout(timer)
  }, [loading])

  useEffect(() => {
    setDisplayCount(PAGE_SIZE)
  }, [searchQuery])

  if (loading) {
    return (
      <ListWrapper aria-busy="true" aria-label={t('home.loading')}>
        <SearchSection>
          <SearchBar />
        </SearchSection>
        {isSlow && <SlowNotice role="status">{t('home.slowConnection')}</SlowNotice>}
        <LoadingWrapper>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </LoadingWrapper>
      </ListWrapper>
    )
  }

  if (error) {
    return (
      <ListWrapper>
        <SearchSection>
          <SearchBar />
        </SearchSection>
        <ErrorWrapper role="alert">
          <p>{t('home.error')}</p>
          <button onClick={fetchPhones}>{t('detail.back')}</button>
        </ErrorWrapper>
      </ListWrapper>
    )
  }

  if (filteredPhones.length === 0 && searchQuery) {
    return (
      <ListWrapper>
        <SearchSection>
          <SearchBar />
        </SearchSection>
        <ResultsInfo aria-live="polite">
          {t('search.noResults', { query: searchQuery })}
        </ResultsInfo>
        <NoResults>{t('search.noResults', { query: searchQuery })}</NoResults>
      </ListWrapper>
    )
  }

  const visiblePhones = filteredPhones.slice(0, displayCount)
  const hasMore = filteredPhones.length > displayCount

  return (
    <ListWrapper>
      <SearchSection>
        <SearchBar />
        <ResultsInfo aria-live="polite" aria-atomic="true">
          {hasMore
            ? t('home.showing', { visible: displayCount, total: filteredPhones.length })
            : t('search.results', { count: filteredPhones.length })}
        </ResultsInfo>
      </SearchSection>

      <Grid ref={animationParent} aria-label={t('home.title')}>
        {visiblePhones.map(phone => (
          <li key={phone.id}>
            <PhoneCard phone={phone} />
          </li>
        ))}
      </Grid>

      {hasMore && (
        <LoadMoreWrapper>
          <ResultsInfo aria-live="polite">
            {t('home.showing', { visible: displayCount, total: filteredPhones.length })}
          </ResultsInfo>
          <LoadMoreButton
            type="button"
            onClick={() => setDisplayCount(c => c + PAGE_SIZE)}
          >
            {t('home.loadMore', { count: filteredPhones.length - displayCount })}
          </LoadMoreButton>
        </LoadMoreWrapper>
      )}
    </ListWrapper>
  )
}

export default PhoneList
