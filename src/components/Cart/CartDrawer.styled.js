import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: var(--z-overlay);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity var(--transition-base), visibility var(--transition-base);
`

export const Drawer = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: min(var(--max-width-drawer), 100vw);
  background: var(--color-white);
  z-index: var(--z-drawer);
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform var(--transition-base);
  box-shadow: var(--shadow-drawer);
`

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-grey-200);

  h2 {
    font-size: var(--fs-base);
    font-weight: var(--fw-bold);
    letter-spacing: var(--ls-wider);
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
  font-size: var(--fs-base);
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
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: var(--fs-body);
    color: var(--color-grey-500);
    display: block;
    margin-top: 2px;
  }

  p {
    font-size: var(--fs-md);
    font-weight: var(--fw-bold);
    margin-top: var(--spacing-xs);
  }
`

export const RemoveButton = styled.button`
  color: var(--color-grey-400);
  font-size: var(--fs-sm);
  text-decoration: underline;
  text-transform: uppercase;
  letter-spacing: var(--ls-md);
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
  font-weight: var(--fw-bold);
  font-size: var(--fs-base);
  letter-spacing: var(--ls-md);
  text-transform: uppercase;
`
