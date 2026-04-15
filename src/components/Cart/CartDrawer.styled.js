import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 300;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity var(--transition-base), visibility var(--transition-base);
`

export const Drawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: min(400px, 100vw);
  background: var(--color-white);
  z-index: 400;
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform var(--transition-base);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
`

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-grey-200);

  h2 {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-black);
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.6;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md) var(--spacing-lg);
`

export const EmptyCart = styled.p`
  text-align: center;
  color: var(--color-grey-400);
  padding: var(--spacing-2xl) 0;
  font-size: 0.95rem;
`

export const CartItem = styled.article`
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:last-child {
    border-bottom: none;
  }
`

export const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: var(--color-grey-100);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;

  strong {
    font-size: 0.875rem;
    font-weight: 600;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.8rem;
    color: var(--color-grey-500);
    display: block;
    margin-top: 2px;
  }

  p {
    font-size: 0.875rem;
    font-weight: 700;
    margin-top: var(--spacing-xs);
  }
`

export const RemoveButton = styled.button`
  color: var(--color-grey-400);
  font-size: 0.75rem;
  text-decoration: underline;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  align-self: flex-start;
  margin-top: auto;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-black);
  }
`

export const DrawerFooter = styled.div`
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--color-grey-200);
`

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`
