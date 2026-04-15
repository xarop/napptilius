import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-grey-200);
  transition: box-shadow var(--transition-base), transform var(--transition-base);
  text-decoration: none;
  color: inherit;
  overflow: hidden;

  &:hover,
  &:focus-visible {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`

export const ImageWrapper = styled.div`
  aspect-ratio: 1;
  background: var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: var(--spacing-md);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform var(--transition-base);
  }

  ${Card}:hover & img {
    transform: scale(1.04);
  }
`

export const CardBody = styled.div`
  padding: 10px var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-top: 1px solid var(--color-grey-200);
`

export const Brand = styled.span`
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-grey-500);
`

export const NamePriceRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--spacing-xs);
`

export const Name = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-black);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`

export const Price = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-black);
  white-space: nowrap;
  flex-shrink: 0;
`
