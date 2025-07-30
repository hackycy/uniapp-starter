import type { ThemeColor, ThemeMode, ThemeState } from '#/theme'
import { defineStore } from 'pinia'
import { Theme_Color_Presets } from '@/settings/designSetings'
import { store } from '..'

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    themeMode: 'light',
    themeColor: Theme_Color_Presets[0],
    followSystem: true,
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
      colorTheme: Theme_Color_Presets[0].primaryColor,
    },
  }),
  getters: {
    isDarkMode(state): boolean {
      return state.themeMode === 'dark'
    },
  },
  actions: {
    toggleTheme(mode?: ThemeMode) {
      if (mode && mode === this.themeMode) {
        return
      }

      this.followSystem = false
      this.themeMode = mode || (this.themeMode === 'light' ? 'dark' : 'light')
    },
    getSystemTheme(): ThemeMode {
      // #ifdef MP-WEIXIN
      const appInfo = uni.getAppBaseInfo()
      if (appInfo && appInfo.theme) {
        return appInfo.theme as ThemeMode
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
    setThemeMode(mode: ThemeMode) {
      this.themeMode = mode
    },
    setThemeColor(color: ThemeColor) {
      this.themeColor = color
      this.themeVars.colorTheme = color.primaryColor
    },
  },
})

// Need to be used outside the setup
export function useThemeStoreWithOut() {
  return useThemeStore(store)
}
