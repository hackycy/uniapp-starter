import type { ConfigProviderThemeVars } from 'wot-design-uni'

/**
 * 主题类型
 */
export type ThemeMode = 'light' | 'dark'

export interface ThemeColor {
  name: string
  primaryColor: string
}

export interface ThemeState {
  themeMode: ThemeMode
  followSystem: boolean
  themeColor: ThemeColor
  themeVars: ConfigProviderThemeVars
}
