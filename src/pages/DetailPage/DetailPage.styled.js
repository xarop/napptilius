import styled from 'styled-components'

export const PageWrapper = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-md);

  @media (min-width: 768px) {
    padding: var(--spacing-xl);
  }
`

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-grey-500);
  cursor: pointer;
  transition: color var(--transition-fast);
  margin-bottom: var(--spacing-lg);

  &:hover {
    color: var(--color-black);
  }

  svg {
    width: 14px;
    height: 14px;
  }
`

export const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-2xl);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 480px;
  }
`

export const ImageSection = styled.div`
  background: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  min-height: 320px;

  @media (min-width: 768px) {
    min-height: 480px;
  }

  img {
    max-height: 400px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }
`

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-top: var(--spacing-sm);
`

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Brand = styled.span`
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-grey-500);
`

export const PhoneName = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`

export const PriceTag = styled.p`
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.02em;
  margin-top: 10px;
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-grey-200);
`

export const SectionLabel = styled.h2`
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-grey-500);
  margin-bottom: 14px;
`

export const ColorName = styled.p`
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: var(--color-grey-500);
  margin-top: 10px;
`

export const ColorOptions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`

export const ColorSwatch = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 0;
  background: ${({ $color }) => $color};
  border: 1px solid ${({ $selected }) => ($selected ? 'var(--color-black)' : 'var(--color-grey-300)')};
  transition: border-color var(--transition-fast);

  &:hover {
    border-color: var(--color-black);
  }
`

export const StorageOptions = styled.div`
  display: flex;
  gap: 6px;
`

export const StorageButton = styled.button`
  flex: 1;
  padding: 12px 8px;
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
  border: ${({ $selected }) =>
    $selected ? '2px solid var(--color-black)' : '1px solid var(--color-grey-300)'};
  background: transparent;
  color: var(--color-black);
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-black);
  }
`

export const AddToCartButton = styled.button`
  width: 100%;
  padding: 18px var(--spacing-lg);
  background: #000000;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 300;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: opacity var(--transition-fast);

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const SpecsTable = styled.section`
  margin-top: var(--spacing-lg);

  h2 {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-grey-500);
    margin-bottom: var(--spacing-md);
  }

  dl {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid var(--color-grey-200);
  }

  dt,
  dd {
    padding: 10px 12px;
    font-size: 0.825rem;
    border-bottom: 1px solid var(--color-grey-200);

    &:nth-last-child(-n + 2) {
      border-bottom: none;
    }
  }

  dt {
    font-weight: 600;
    background: var(--color-grey-100);
    color: var(--color-grey-700);
  }

  dd {
    color: var(--color-black);
  }
`

export const Feedback = styled.p`
  font-size: 0.8rem;
  color: var(--color-success);
  font-weight: 600;
  text-align: center;
  min-height: 20px;
`
