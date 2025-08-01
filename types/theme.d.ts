import type { ConfigProviderThemeVars } from 'wot-design-uni'

/**
 * 主题类型
 */
export type Theme = 'light' | 'dark'
export type AppTheme = Theme | 'system'

/**
 * Tab Bar类型
 */
export type TabBarType = 'native' | 'custom' | 'none'

export interface ThemeState {
  theme: AppTheme
  systemTheme: Theme
  themeColor: string
  themeVars: ConfigProviderThemeVars
}
