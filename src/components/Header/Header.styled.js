import styled from 'styled-components'

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--z-header);
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
  transition: background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease;

  [data-theme='dark'] & {
    background-color: ${({ $scrolled }) =>
    $scrolled ? 'rgba(10, 10, 10, 0.75)' : 'rgba(10, 10, 10, 0)'};
    border-bottom-color: ${({ $scrolled }) =>
    $scrolled ? 'rgba(255,255,255,0.08)' : 'transparent'};
  }
`

export const HeaderInner = styled.div`
  width: 100%;
  max-width: var(--max-width-page);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);

  @media (min-width: 768px) {
    padding: 0 var(--spacing-xl);
  }
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
  font-size: var(--fs-md);
  font-weight: var(--fw-medium);
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
  font-size: var(--fs-base);
  font-weight: var(--fw-regular);
  color: var(--color-black);
  line-height: 1;
  display: inline-flex;
  align-items: center;
`
