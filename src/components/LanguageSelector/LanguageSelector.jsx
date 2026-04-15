import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectorWrapper, LangButton, Dropdown, LangOption } from './LanguageSelector.styled'

const LANGS = [
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
  { code: 'en', label: 'EN' },
]

function LanguageSelector() {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = i18n.language?.slice(0, 2) || 'en'

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(code) {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <SelectorWrapper ref={ref}>
      <LangButton
        onClick={() => setOpen(o => !o)}
        aria-label={t('accessibility.languageSelector')}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {current.toUpperCase()}
      </LangButton>

      {open && (
        <Dropdown role="listbox" aria-label={t('accessibility.languageSelector')}>
          {LANGS.map(lang => (
            <LangOption key={lang.code} $active={current === lang.code}>
              <button
                role="option"
                aria-selected={current === lang.code}
                onClick={() => handleSelect(lang.code)}
              >
                {t(`language.${lang.code}`)}
              </button>
            </LangOption>
          ))}
        </Dropdown>
      )}
    </SelectorWrapper>
  )
}

export default LanguageSelector
