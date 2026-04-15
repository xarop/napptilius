import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--header-height));
  text-align: center;
  padding: var(--spacing-xl);
  gap: var(--spacing-lg);
`

const Code = styled.p`
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
`

const Message = styled.p`
  font-size: 1rem;
  color: var(--color-grey-500);
`

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background: var(--color-black);
  color: var(--color-white);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.8;
  }
`

function NotFound() {
  const { t } = useTranslation()
  return (
    <Wrapper id="main-content">
      <Code>404</Code>
      <h1>{t('errors.notFound')}</h1>
      <Message>{t('errors.notFoundDesc')}</Message>
      <HomeLink to="/">{t('errors.goHome')}</HomeLink>
    </Wrapper>
  )
}

export default NotFound
