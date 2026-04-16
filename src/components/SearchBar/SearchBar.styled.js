import styled from 'styled-components'

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-black);
  color: var(--color-black);
  padding: var(--spacing-md) 36px var(--spacing-md) 0;
  font-size: var(--fs-base);
  font-family: inherit;
  transition: border-color var(--transition-fast);

  &::placeholder {
    color: var(--color-grey-400);
  }

  &:focus {
    outline: none;
    border-bottom-color: var(--color-black);
  }

  /* hide browser default clear button */
  &::-webkit-search-cancel-button {
    display: none;
  }
`

export const ClearButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-black);
  display: flex;
  align-items: center;
  padding: 4px;

  svg {
    width: 14px;
    height: 14px;
  }
`

/* kept for compatibility but no longer rendered */
export const SearchIconWrapper = styled.span``
