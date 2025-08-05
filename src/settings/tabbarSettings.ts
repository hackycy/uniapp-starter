import type { TabBarType } from '#/theme'
import type { TabBarItem } from '@uni-helper/vite-plugin-uni-pages'

/**
 * 激活的 tabbar 类型
 * 默认值为 'custom'，表示使用自定义的 TabBar
 * 当选择为 'native' 时，表示使用原生的 TabBar，需要自行在pages.config.ts中配置
 */
export const ACTIVE_TAB_BAR_TYPE: TabBarType = 'custom'

/**
 * 自定义TabBar的Item配置
 */
export const DEFAULT_Tab_Bar_Items: TabBarItem[] = [
  {
    pagePath: 'pages/home/index',
    text: '首页',
    icon: '',
  },
  {
    pagePath: 'pages/mine/index',
    text: '我的',
    icon: '',
  },
]
