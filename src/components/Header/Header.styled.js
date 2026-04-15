import styled from 'styled-components'

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ $scrolled }) =>
    $scrolled ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 0)'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(12px)' : 'none')};
  -webkit-backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(12px)' : 'none')};
  border-bottom: ${({ $scrolled }) =>
    $scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent'};
  color: var(--color-black);
  height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
  transition: background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease;

  @media (min-width: 768px) {
    padding: 0 var(--spacing-xl);
  }

  [data-theme='dark'] & {
    background-color: ${({ $scrolled }) =>
      $scrolled ? 'rgba(10, 10, 10, 0.75)' : 'rgba(10, 10, 10, 0)'};
    border-bottom-color: ${({ $scrolled }) =>
      $scrolled ? 'rgba(255,255,255,0.08)' : 'transparent'};
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
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: opacity var(--transition-fast);

  svg path, svg rect {
    fill: var(--color-black);
  }

  &:hover {
    opacity: 0.7;
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
  color: var(--color-black);
  font-size: 0.875rem;
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-sm);
  transition: opacity var(--transition-fast);
  position: relative;

  &:hover {
    opacity: 0.6;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  svg path {
    fill: var(--color-black);
  }
`

export const CartBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-black);
`
