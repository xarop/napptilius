import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PageWrapper = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
  padding-bottom: 120px;

  @media (min-width: 768px) {
    padding: var(--spacing-xl);
    padding-bottom: 120px;
  }
`

export const Title = styled.h1`
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: var(--spacing-xl);
`

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
`

export const CartItem = styled.article`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
  border-bottom: 1px solid var(--color-grey-200);

  &:first-child {
    border-top: 1px solid var(--color-grey-200);
  }

  @media (max-width: 768px) {
    grid-template-columns: 120px 1fr;
    gap: var(--spacing-md);
  }
`

export const ItemImage = styled.div`
  aspect-ratio: 1;
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
  display: flex;
  flex-direction: column;
  padding: var(--spacing-sm) 0;
`

export const ItemName = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
`

export const ItemVariant = styled.p`
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-grey-500);
  margin-bottom: var(--spacing-sm);
`

export const ItemPrice = styled.p`
  font-size: 0.875rem;
`

export const RemoveButton = styled.button`
  font-size: 0.8rem;
  color: var(--color-error);
  align-self: flex-start;
  margin-top: var(--spacing-md);
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.7;
  }
`

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: stretch;
  min-height: 72px;
  background: var(--color-white);
  border-top: 1px solid var(--color-grey-200);
  z-index: 10;
`

export const ContinueButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px var(--spacing-xl);
  border: 1px solid var(--color-black);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-black);
  background: transparent;
  white-space: nowrap;
  transition: background var(--transition-fast), color var(--transition-fast);
  margin: var(--spacing-md) var(--spacing-xl);

  &:hover {
    background: var(--color-black);
    color: var(--color-white);
  }
`

export const TotalSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-xl);
  padding-right: var(--spacing-xl);
`

export const TotalLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

export const TotalPrice = styled.span`
  font-size: 0.875rem;
`

export const PayButton = styled.button`
  padding: 20px var(--spacing-2xl);
  background: #000000;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  min-width: 200px;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.85;
  }
`
