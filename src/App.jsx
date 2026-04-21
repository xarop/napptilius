import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { CartProvider } from './context/CartContext'
import { PhoneProvider } from './context/PhoneContext'
import { ThemeModeProvider } from './context/ThemeContext'
import GlobalStyles from './styles/GlobalStyles'
import theme from './styles/theme'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import DetailPage from './pages/DetailPage/DetailPage'
import CartPage from './pages/CartPage/CartPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage/OrderConfirmationPage'
import NotFound from './components/NotFound/NotFound'

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <ThemeModeProvider>
      <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CartProvider>
        <PhoneProvider>
          <a href="#main-content" className="skip-nav">
            Skip to main content
          </a>
          <Header />
          <div key={location.key} className="page-transition-wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/phones/:id" element={<DetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </PhoneProvider>
      </CartProvider>
    </ThemeProvider>
    </ThemeModeProvider>
  )
}

export default App
