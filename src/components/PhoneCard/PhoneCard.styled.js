import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-grey-200);
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--color-black);
    transform: translateY(100%);
    transition: transform var(--transition-slow);
    z-index: 0;
  }

  &:hover::after,
  &:focus-visible::after {
    transform: translateY(0);
  }
`

export const ImageWrapper = styled.div`
  aspect-ratio: 1;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: var(--spacing-lg);
  position: relative;
  z-index: 1;
  transition: background var(--transition-slow);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform var(--transition-base), opacity var(--transition-base);
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
  position: relative;
  z-index: 1;
`

export const Brand = styled.span`
  font-size: var(--fs-2xs);
  font-weight: var(--fw-regular);
  letter-spacing: var(--ls-base);
  text-transform: uppercase;
  color: var(--color-grey-500);
  transition: color var(--transition-slow);

  ${Card}:hover & {
    color: var(--color-grey-400);
  }
`

export const NamePriceRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--spacing-xs);
`

export const Name = styled.span`
  font-size: var(--fs-sm);
  font-weight: var(--fw-regular);
  letter-spacing: var(--ls-sm);
  text-transform: uppercase;
  color: var(--color-black);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  transition: color var(--transition-slow);

  ${Card}:hover & {
    color: var(--color-white);
  }
`

export const Price = styled.span`
  font-size: var(--fs-sm);
  font-weight: var(--fw-regular);
  color: var(--color-black);
  white-space: nowrap;
  flex-shrink: 0;
  transition: color var(--transition-slow);

  ${Card}:hover & {
    color: var(--color-white);
  }
`
