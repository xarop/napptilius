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
  font-size: var(--fs-body);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-wide);
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
  font-size: var(--fs-sm);
  font-weight: var(--fw-light);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--color-grey-500);
`

export const PhoneName = styled.h1`
  font-size: var(--fs-xl);
  font-weight: var(--fw-light);
  letter-spacing: var(--ls-sm);
  text-transform: uppercase;
  line-height: var(--lh-tight);

  @media (min-width: 768px) {
    font-size: var(--fs-2xl);
  }
`

export const PriceTag = styled.p`
  font-size: var(--fs-lg);
  font-weight: var(--fw-light);
  letter-spacing: var(--ls-tight);
  margin-top: 10px;
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-grey-200);
`

export const SectionLabel = styled.h2`
  font-size: var(--fs-xs);
  font-weight: var(--fw-light);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--color-grey-500);
  margin-bottom: 14px;
`

export const ColorName = styled.p`
  font-size: var(--fs-sm);
  font-weight: var(--fw-light);
  letter-spacing: var(--ls-sm);
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
  border: 1px solid transparent;
  outline: ${({ $selected }) =>
    $selected ? '2px solid var(--color-black)' : '1px solid var(--color-grey-300)'};
  outline-offset: ${({ $selected }) => ($selected ? '2px' : '0')};
  transition: outline var(--transition-fast), outline-offset var(--transition-fast);

  &:hover {
    outline: 2px solid var(--color-black);
    outline-offset: 2px;
  }
`

export const StorageOptions = styled.div`
  display: flex;
  gap: 0;
`

export const StorageButton = styled.button`
  flex: 0 0 95px;
  width: 95px;
  padding: 12px 8px;
  font-size: var(--fs-body);
  font-weight: var(--fw-light);
  letter-spacing: var(--ls-md);
  text-transform: uppercase;
  text-align: center;
  border: ${({ $selected }) =>
    $selected ? '2px solid var(--color-black)' : '1px solid var(--color-grey-300)'};
  background: transparent;
  color: var(--color-black);
  position: relative;
  transition: all var(--transition-fast);

  & + & {
    margin-left: -1px;
  }

  &:hover {
    border-color: var(--color-black);
    z-index: 1;
  }

  ${({ $selected }) => $selected && 'z-index: 2;'}
`

export const AddToCartButton = styled.button`
  width: 100%;
  padding: 18px var(--spacing-lg);
  background: var(--color-black);
  color: var(--color-white);
  font-size: var(--fs-md);
  font-weight: var(--fw-light);
  letter-spacing: var(--ls-widest);
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
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-xl);

  h2 {
    font-size: var(--fs-section-title);
    font-weight: var(--fw-light);
    letter-spacing: 0;
    line-height: 1;
    text-transform: uppercase;
    color: var(--color-black);
    margin-bottom: var(--spacing-xl);
  }

  dl {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--color-grey-200);
  }

  dt,
  dd {
    padding: 10px 0;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
  }

  /* each row is a flex pair */
  div {
    display: flex;
    gap: var(--spacing-xl);
    border-bottom: 1px solid var(--color-grey-200);
    align-items: baseline;
  }

  dt {
    flex: 0 0 160px;
    font-size: var(--fs-xs);
    font-weight: var(--fw-regular);
    letter-spacing: var(--ls-widest);
    text-transform: uppercase;
    color: var(--color-grey-500);

    @media (max-width: 480px) {
      flex: 0 0 110px;
    }
  }

  dd {
    flex: 1;
    font-weight: var(--fw-regular);
    color: var(--color-black);
  }
`

export const Feedback = styled.p`
  font-size: var(--fs-body);
  color: var(--color-success);
  font-weight: var(--fw-semibold);
  text-align: center;
  min-height: 20px;
`
