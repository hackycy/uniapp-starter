import type { ConfigProviderThemeVars } from 'wot-design-uni'

// 主题
export type Theme = 'light' | 'dark'
export type AppTheme = Theme | 'system'

export interface ThemeState {
  theme: AppTheme
  systemTheme: Theme
  themeColor: string
  themeVars: ConfigProviderThemeVars
}
