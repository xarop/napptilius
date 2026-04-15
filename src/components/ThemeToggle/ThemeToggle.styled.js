import styled from 'styled-components'

export const ToggleButton = styled.button`
  position: relative;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
`

export const Track = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 11px;
  background: ${({ $isDark }) => ($isDark ? 'var(--color-black)' : 'transparent')};
  border: 1.5px solid var(--color-black);
  transition: background 250ms ease;
`

export const Thumb = styled.span`
  position: absolute;
  top: 3px;
  left: ${({ $isDark }) => ($isDark ? 'calc(100% - 19px)' : '3px')};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ $isDark }) => ($isDark ? 'var(--color-white)' : 'var(--color-black)')};
  transition: left 250ms ease, background 250ms ease;
`
