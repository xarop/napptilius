import styled from 'styled-components'

export const Section = styled.section`
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-xl);

  /* break out of PageWrapper's max-width constraint */
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
`

export const Heading = styled.h2`
  font-size: var(--fs-section-title);
  font-weight: var(--fw-light);
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  color: var(--color-black);
  margin-bottom: var(--spacing-xl);
  /* align with page content */
  padding-left: var(--spacing-md);

  @media (min-width: 768px) {
    padding-left: calc(50vw - min(50vw, calc(var(--max-width-page) / 2)) + var(--spacing-xl));
  }
`

export const Strip = styled.ul`
  display: flex;
  gap: 0;
  overflow-x: auto;
  list-style: none;
  align-items: stretch;
  /* pad strip so first/last cards align with page content */
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);

  @media (min-width: 768px) {
    padding-left: calc(50vw - min(50vw, calc(var(--max-width-page) / 2)) + var(--spacing-xl));
    padding-right: calc(50vw - min(50vw, calc(var(--max-width-page) / 2)) + var(--spacing-xl));
  }

  /* custom scrollbar — thin, separated from cards via padding */
  padding-bottom: var(--spacing-md);
  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-300) transparent;

  &::-webkit-scrollbar {
    height: 1px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-grey-100);
    margin: 0 var(--spacing-md);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-400);
    border-radius: var(--radius-full);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-black);
  }
`

export const StripItem = styled.li`
  flex: 0 0 344px;
  width: 344px;
  height: 344px;
  background: var(--color-white);
  border: 0.5px solid var(--color-black);
  display: flex;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex: 0 0 85%;
    width: 85%;
    height: auto;
  }
`
