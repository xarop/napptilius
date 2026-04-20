import ThemeToggle from '../ThemeToggle/ThemeToggle'
import LanguageSelector from '../LanguageSelector/LanguageSelector'
import { StyledFooter, FooterLeft, FooterRight, BackToTop } from './Footer.styled'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <StyledFooter aria-label="Site footer">
      <FooterLeft>
        <span>© {year} Napptilius</span>
        <span aria-hidden="true">·</span>
        <span>
          Developed in Barcelona by{' '}
          <a href="https://xarop.com" target="_blank" rel="noopener noreferrer">
            xarop.com
          </a>
        </span>
        <span aria-hidden="true">·</span>
        <a href="https://github.com/xarop/napptilius/" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </FooterLeft>

      <BackToTop
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1 7L6 2L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </BackToTop>

      <FooterRight>
        <LanguageSelector />
        <ThemeToggle />
      </FooterRight>
    </StyledFooter>
  )
}

export default Footer
