import type { TabBarType } from '#/theme'
import type { TabBarItem } from '@uni-helper/vite-plugin-uni-pages'

/**
 * 激活的 tabbar 类型
 */
export const ACTIVE_TAB_BAR_TYPE: TabBarType = 'custom'

export const Tab_Bar_Items: TabBarItem[] = [
  {
    pagePath: 'pages/home/index',
    text: '首页',
  },
  {
    pagePath: 'pages/mine/index',
    text: '我的',
  },
]
