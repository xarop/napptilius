import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PageWrapper = styled.main`
  max-width: var(--max-width-page);
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
  padding-bottom: 120px;

  @media (min-width: 768px) {
    padding: var(--spacing-xl);
    padding-bottom: 100px;
  }
`

export const Title = styled.h1`
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-wider);
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
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  margin-bottom: 4px;
`

export const ItemVariant = styled.p`
  font-size: var(--fs-body);
  letter-spacing: var(--ls-md);
  text-transform: uppercase;
  color: var(--color-grey-500);
  margin-bottom: var(--spacing-sm);
`

export const ItemPrice = styled.p`
  font-size: var(--fs-md);
`

export const RemoveButton = styled.button`
  font-size: var(--fs-body);
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
  flex-wrap: wrap;
  background: var(--color-white);
  border-top: 1px solid var(--color-grey-200);
  z-index: var(--z-footer);

  @media (min-width: 768px) {
    flex-wrap: nowrap;
    align-items: stretch;
    min-height: 72px;
  }
`

export const ContinueButton = styled(Link)`
  /* mobile: second row, left half */
  order: 2;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  border: 1px solid var(--color-black);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--color-black);
  background: transparent;
  white-space: nowrap;
  transition: background var(--transition-fast), color var(--transition-fast);

  &:hover {
    background: var(--color-black);
    color: var(--color-white);
  }

  /* desktop: left side with margin */
  @media (min-width: 768px) {
    order: 0;
    flex: none;
    padding: 20px var(--spacing-xl);
    margin: var(--spacing-md) var(--spacing-xl);
  }
`

export const TotalSection = styled.div`
  /* mobile: first row, full width */
  order: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-grey-200);

  /* desktop: right side, flex-grow */
  @media (min-width: 768px) {
    order: 0;
    width: auto;
    flex: 1;
    justify-content: flex-end;
    gap: var(--spacing-xl);
    padding: 0 var(--spacing-xl);
    border-bottom: none;
  }
`

export const TotalLabel = styled.span`
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
`

export const TotalPrice = styled.span`
  font-size: var(--fs-md);
`

export const PayButton = styled.button`
  /* mobile: second row, right half */
  order: 3;
  flex: 1;
  padding: var(--spacing-md);
  background: var(--color-black);
  color: var(--color-white);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  white-space: nowrap;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.85;
  }

  /* desktop: right edge, full-height */
  @media (min-width: 768px) {
    order: 0;
    flex: none;
    padding: 20px var(--spacing-2xl);
    align-self: stretch;
    min-width: 200px;
  }
`
