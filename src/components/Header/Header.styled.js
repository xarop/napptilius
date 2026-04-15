import styled from 'styled-components'

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-black);
  color: var(--color-white);
  height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);

  @media (min-width: 768px) {
    padding: 0 var(--spacing-xl);
  }
`

export const HeaderInner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
`

export const Logo = styled.a`
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-white);
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    opacity: 0.85;
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-shrink: 0;
`

export const CartButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-white);
  font-size: 0.875rem;
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--spacing-xs);
  transition: opacity var(--transition-fast);
  position: relative;

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

export const CartBadge = styled.span`
  background-color: var(--color-white);
  color: var(--color-black);
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
`
