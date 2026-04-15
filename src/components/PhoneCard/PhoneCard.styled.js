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
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`

export const Brand = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-grey-500);
`

export const Name = styled.h2`
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--color-black);
`

export const Price = styled.p`
  font-size: 0.95rem;
  font-weight: 700;
  margin-top: auto;
  padding-top: var(--spacing-sm);
`
