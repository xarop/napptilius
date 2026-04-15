import styled from 'styled-components'

export const SelectorWrapper = styled.div`
  position: relative;
`

export const LangButton = styled.button`
  color: var(--color-black);
  font-size: var(--fs-body);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-md);
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
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
  border-radius: var(--radius-sm);
  min-width: 120px;
  z-index: var(--z-dropdown);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`

export const LangOption = styled.li`
  button {
    width: 100%;
    text-align: left;
    padding: 10px 14px;
    font-size: var(--fs-md);
    color: var(--color-black);
    font-weight: ${({ $active }) => ($active ? '700' : '400')};
    background: ${({ $active }) => ($active ? 'var(--color-grey-100)' : 'transparent')};
    transition: background var(--transition-fast);

    &:hover {
      background: var(--color-grey-100);
    }
  }
`
