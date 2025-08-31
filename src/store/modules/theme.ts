import type { AppTheme, Theme, ThemeState } from '#/store'
import { defineStore } from 'pinia'
import { THEME_PRIMARY_COLOR_KEY } from '@/enums/cacheEnum'
import { Theme_Color_Presets } from '@/settings/designSetings'
import { storage } from '@/utils/cache'
import { store } from '..'

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => {
    const themeColor = storage.get(THEME_PRIMARY_COLOR_KEY) || Theme_Color_Presets[0]

    return {
      theme: 'light',
      systemTheme: 'light',
      themeColor,
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
        colorTheme: themeColor,
      },
    }
  },
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
    /**
     * 初始化主题设定
     */
    setup() {
      this.systemTheme = this.getSystemTheme()
      if (this.theme === 'system') {
        this.theme = this.systemTheme
      }
    },
  },
})

// Need to be used outside the setup
export function useThemeStoreWithOut() {
  return useThemeStore(store)
}
