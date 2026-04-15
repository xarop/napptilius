import { useTranslation } from 'react-i18next'
import { usePhones } from '../../context/PhoneContext'
import PhoneCard from '../PhoneCard/PhoneCard'
import {
  ListWrapper,
  ResultsInfo,
  Grid,
  NoResults,
  LoadingWrapper,
  SkeletonCard,
  ErrorWrapper,
} from './PhoneList.styled'

const SKELETON_COUNT = 10

function PhoneList() {
  const { t } = useTranslation()
  const { filteredPhones, loading, error, searchQuery, fetchPhones } = usePhones()

  if (loading) {
    return (
      <ListWrapper aria-busy="true" aria-label={t('home.loading')}>
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
        <ResultsInfo aria-live="polite">
          {t('search.noResults', { query: searchQuery })}
        </ResultsInfo>
        <NoResults>{t('search.noResults', { query: searchQuery })}</NoResults>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <ResultsInfo aria-live="polite" aria-atomic="true">
        {t('search.results', { count: filteredPhones.length })}
      </ResultsInfo>

      <Grid aria-label={t('home.title')}>
        {filteredPhones.map(phone => (
          <li key={phone.id}>
            <PhoneCard phone={phone} />
          </li>
        ))}
      </Grid>
    </ListWrapper>
  )
}

export default PhoneList
