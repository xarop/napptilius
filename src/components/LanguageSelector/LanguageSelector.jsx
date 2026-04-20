import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { LangBar, LangItem, LangSep } from './LanguageSelector.styled'

const LANGS = [
  { code: 'es' },
  { code: 'ca' },
  { code: 'en' },
]

function LanguageSelector() {
  const { i18n, t } = useTranslation()
  const current = i18n.language?.slice(0, 2) || 'en'

  return (
    <LangBar aria-label={t('accessibility.languageSelector')}>
      {LANGS.map((lang, idx) => (
        <Fragment key={lang.code}>
          {idx > 0 && <LangSep aria-hidden="true">|</LangSep>}
          <LangItem
            type="button"
            $active={current === lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            aria-current={current === lang.code ? 'true' : undefined}
          >
            {t(`language.${lang.code}`)}
          </LangItem>
        </Fragment>
      ))}
    </LangBar>
  )
}

export default LanguageSelector
