import { useTranslation } from 'react-i18next'

const formatters = {
  es: new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  ca: new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  en: new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
}

const symbols = { es: '€', ca: '€', en: 'EUR' }

/**
 * Returns a locale-aware price formatter.
 * ES / CA → "1.319,00 €"  (period as thousands sep, comma as decimal)
 * EN      → "1,345.65 EUR"
 */
export function useFormatPrice() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.slice(0, 2) ?? 'en'
  const fmt = formatters[lang] ?? formatters.en
  const symbol = symbols[lang] ?? 'EUR'

  return amount => `${fmt.format(Number(amount))} ${symbol}`
}
