import styled from 'styled-components'

export const SelectorWrapper = styled.div`
  position: relative;
`

export const LangButton = styled.button`
  color: var(--color-black);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 2px;
  transition: opacity var(--transition-fast);
  border: 1px solid var(--color-grey-300);

  &:hover {
    opacity: 0.8;
  }
`

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: var(--color-white);
  color: var(--color-black);
  border: 1px solid var(--color-grey-200);
  border-radius: 2px;
  min-width: 120px;
  z-index: 200;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  overflow: hidden;
`

export const LangOption = styled.li`
  button {
    width: 100%;
    text-align: left;
    padding: 10px 14px;
    font-size: 0.875rem;
    color: var(--color-black);
    font-weight: ${({ $active }) => ($active ? '700' : '400')};
    background: ${({ $active }) => ($active ? 'var(--color-grey-100)' : 'transparent')};
    transition: background var(--transition-fast);

    &:hover {
      background: var(--color-grey-100);
    }
  }
`
