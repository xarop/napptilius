import styled from 'styled-components'

export const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-md);
  border-top: 1px solid var(--color-grey-200);
  font-size: var(--fs-xs);
  font-weight: var(--fw-regular);
  letter-spacing: var(--ls-md);
  color: var(--color-grey-500);
  text-transform: uppercase;

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
