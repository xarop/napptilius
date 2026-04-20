import styled from 'styled-components'

const footerBase = `
  font-size: var(--fs-xs);
  font-weight: var(--fw-regular);
  letter-spacing: var(--ls-md);
  color: var(--color-grey-500);
  text-transform: uppercase;
`

export const StyledFooter = styled.footer`
  ${footerBase}
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg) var(--spacing-md);
  border-top: 1px solid var(--color-grey-200);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: var(--spacing-md) var(--spacing-xl);
  }

  a {
    color: var(--color-grey-500);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-black);
    }
  }
`

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
`

export const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-shrink: 0;
`

export const BackToTop = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  color: var(--color-grey-500);
  line-height: 1;
  flex-shrink: 0;
  transition: color var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    color: var(--color-black);
    border-color: var(--color-black);
  }

  @media (min-width: 768px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`
