import type { TabBarConfig } from '@/components/TabBar/types'
import { TabBarStrategy } from '@/components/TabBar/types'

/**
 * 默认 TabBar 配置
 * 用于向下兼容和作为全局默认配置
 */
export const defaultTabBarConfig: TabBarConfig = {
  strategy: TabBarStrategy.CUSTOM,
  items: [
    {
      pagePath: 'pages/index',
      text: '案例',
      icon: 'i-basil-apps-solid',
      iconType: 'unocss',
    },
    {
      pagePath: 'pages/about',
      text: '关于',
      icon: 'i-mdi-github-face',
      iconType: 'unocss',
    },
  ],
}
