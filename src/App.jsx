import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CartProvider } from './context/CartContext'
import { PhoneProvider } from './context/PhoneContext'
import { ThemeModeProvider } from './context/ThemeContext'
import GlobalStyles from './styles/GlobalStyles'
import theme from './styles/theme'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import DetailPage from './pages/DetailPage/DetailPage'
import CartPage from './pages/CartPage/CartPage'
import NotFound from './components/NotFound/NotFound'

function App() {
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones/:id" element={<DetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PhoneProvider>
      </CartProvider>
    </ThemeProvider>
    </ThemeModeProvider>
  )
}

export default App
