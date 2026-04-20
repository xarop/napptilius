import styled from 'styled-components'

export const LangBar = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  justify-content: center;
`

export const LangSep = styled.span`
  color: var(--color-grey-300);
  font-size: var(--fs-xs);
  user-select: none;
`

export const LangItem = styled.button`
  font-size: var(--fs-xs);
  font-weight: ${({ $active }) => ($active ? 'var(--fw-semibold)' : 'var(--fw-regular)')};
  color: ${({ $active }) => ($active ? 'var(--color-black)' : 'var(--color-grey-500)')};
  letter-spacing: var(--ls-md);
  text-transform: uppercase;
  padding: 2px 0;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-black);
  }
`
