import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import ca from './locales/ca.json'
import en from './locales/en.json'

const LANG_KEY = 'napptilius_lang'

const savedLang = localStorage.getItem(LANG_KEY) || 'en'

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    ca: { translation: ca },
    en: { translation: en },
  },
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', lng => {
  localStorage.setItem(LANG_KEY, lng)
  document.documentElement.lang = lng
})

document.documentElement.lang = savedLang

export default i18n
