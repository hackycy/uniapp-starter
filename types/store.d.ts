import type { TabBarItem as UniTabBarItem } from '@uni-helper/vite-plugin-uni-pages'
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

// TabBar
export interface TabBarItem extends Pick<UniTabBarItem, 'pagePath' | 'text' | 'selectedIconPath' | 'iconPath'> {
  /**
   * 图标类型
   */
  iconType?: 'iconfont' | 'unocss' | 'image' | 'wot'

  /**
   * 图标名称，当 iconType 为 iconfont / unocss 时必填
   */
  icon?: string

  /**
   * 选中状态图标，可选
   */
  selectedIcon?: string

  /**
   * TabBar 显示一个数字或小红点
   */
  badge?: number | 'dot'
}
