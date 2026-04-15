import { StyledFooter } from './Footer.styled'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <StyledFooter aria-label="Site footer">
      <span>© {year} Napptilius</span>
      <span aria-hidden="true"> · </span>
      <span>
        Developed by{' '}
        <a href="https://xarop.com" target="_blank" rel="noopener noreferrer">
          xarop.com
        </a>
      </span>
    </StyledFooter>
  )
}

export default Footer
