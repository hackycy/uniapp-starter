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
export interface TabBarItem extends UniTabBarItem {
  /**
   * iconfont / unocss 使用 icon 属性指定图标
   * image 则沿用默认设定，支持网络图片
   *
   * @default 'none'
   */
  iconType?: 'iconfont' | 'unocss' | 'image' | 'wot' | 'none'

  /**
   * Icon 图标名称
   */
  icon?: string

  /**
   * TabBar 显示一个数字或小红点
   */
  badge?: number | 'dot'
}
