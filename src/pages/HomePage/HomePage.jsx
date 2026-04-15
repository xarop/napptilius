import { useTranslation } from 'react-i18next'
import PhoneList from '../../components/PhoneList/PhoneList'

function HomePage() {
  const { t } = useTranslation()

  return (
    <main id="main-content">
      <h1 className="sr-only">{t('home.title')}</h1>
      <PhoneList />
    </main>
  )
}

export default HomePage
