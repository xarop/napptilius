import { useTranslation } from 'react-i18next'
import { usePhones } from '../../context/PhoneContext'
import { SearchWrapper, SearchInput, ClearButton } from './SearchBar.styled'

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

function SearchBar() {
  const { t } = useTranslation()
  const { searchQuery, setSearchQuery } = usePhones()

  return (
    <SearchWrapper role="search">
      <SearchInput
        type="search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder={t('search.placeholder')}
        aria-label={t('accessibility.searchIcon')}
      />
      {searchQuery && (
        <ClearButton
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
          type="button"
        >
          <XIcon />
        </ClearButton>
      )}
    </SearchWrapper>
  )
}

export default SearchBar
