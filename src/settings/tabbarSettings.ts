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
      icon: 'i-material-symbols-light-star-shine',
      iconType: 'unocss',
    },
    {
      pagePath: 'pages/about',
      text: '关于',
      icon: 'i-material-symbols-recommend-sharp',
      iconType: 'unocss',
    },
  ],
}
