import { useThemeMode } from '../../context/ThemeContext'
import { ToggleButton, Track, Thumb } from './ThemeToggle.styled'

function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeMode()

  return (
    <ToggleButton
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      type="button"
    >
      <Track $isDark={isDark} />
      <Thumb $isDark={isDark} />
    </ToggleButton>
  )
}

export default ThemeToggle
