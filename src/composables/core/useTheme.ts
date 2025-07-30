import type { ThemeMode } from '#/theme'
import { useThemeStore } from '@/store/modules/theme'

export function useTheme() {
  const themeStore = useThemeStore()

  function toggleTheme(mode?: ThemeMode) {
    themeStore.toggleTheme(mode)
  }

  return {
    toggleTheme,
  }
}
