import styled from 'styled-components'

export const ListWrapper = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-md);

  @media (min-width: 768px) {
    padding: var(--spacing-xl);
  }
`

export const SearchSection = styled.div`
  margin-bottom: var(--spacing-md);
`

export const ResultsInfo = styled.p`
  font-size: 0.8rem;
  color: var(--color-grey-500);
  margin-bottom: var(--spacing-lg);
  letter-spacing: 0.03em;
  text-transform: uppercase;
`

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--color-grey-200);
  border: 1px solid var(--color-grey-200);

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }

  li {
    background: var(--color-white);
  }
`

export const NoResults = styled.p`
  text-align: center;
  color: var(--color-grey-500);
  padding: var(--spacing-2xl) 0;
  font-size: 0.95rem;
`

export const LoadingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--color-grey-200);
  border: 1px solid var(--color-grey-200);

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

export const SkeletonCard = styled.div`
  background: var(--color-white);
  aspect-ratio: 0.75;
  animation: pulse 1.4s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
`

export const ErrorWrapper = styled.div`
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-md);

  p {
    color: var(--color-error);
    margin-bottom: var(--spacing-md);
  }

  button {
    padding: 10px 20px;
    background: var(--color-black);
    color: var(--color-white);
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity var(--transition-fast);

    &:hover {
      opacity: 0.8;
    }
  }
`
