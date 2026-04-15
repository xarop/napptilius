import styled from 'styled-components'

export const SearchWrapper = styled.div`
  flex: 1;
  max-width: 360px;
  position: relative;
`

export const SearchInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-white);
  padding: 6px 36px 6px 12px;
  font-size: 0.875rem;
  border-radius: 2px;
  transition: background var(--transition-fast), border-color var(--transition-fast);
  font-family: inherit;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.4);
  }
`

export const SearchIconWrapper = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  display: flex;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
  }
`
