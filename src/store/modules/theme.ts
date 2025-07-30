import type { AppTheme, Theme, ThemeState } from '#/theme'
import { defineStore } from 'pinia'
import { Theme_Color_Presets } from '@/settings/designSetings'
import { store } from '..'

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    theme: 'light',
    systemTheme: 'light',
    themeColor: Theme_Color_Presets[0],
    themeVars: {
      darkBackground: '#0f0f0f',
      darkBackground2: '#1a1a1a',
      darkBackground3: '#242424',
      darkBackground4: '#2f2f2f',
      darkBackground5: '#3d3d3d',
      darkBackground6: '#4a4a4a',
      darkBackground7: '#606060',
      darkColor: '#ffffff',
      darkColor2: '#e0e0e0',
      darkColor3: '#a0a0a0',
      colorTheme: Theme_Color_Presets[0],
    },
  }),
  actions: {
    setTheme(mode: AppTheme) {
      this.theme = mode
    },
    setSystemTheme(theme: Theme) {
      this.systemTheme = theme
    },
    getSystemTheme(): Theme {
      // #ifdef MP-WEIXIN
      const appInfo = uni.getAppBaseInfo()
      if (appInfo && appInfo.theme) {
        return appInfo.theme as Theme
      }
      // #endif

      // #ifdef H5
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
      if (prefersDarkScheme.matches) {
        return 'dark'
      }
      // #endif

      return 'light'
    },
    setThemeColor(color: string) {
      this.themeColor = color
      this.themeVars.colorTheme = color
    },
    setup() {
      this.systemTheme = this.getSystemTheme()
      if (this.theme === 'system') {
        this.theme = this.systemTheme
      }
      this.setThemeColor(Theme_Color_Presets[0])
    },
  },
})

// Need to be used outside the setup
export function useThemeStoreWithOut() {
  return useThemeStore(store)
}
