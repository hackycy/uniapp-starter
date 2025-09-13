import type { TabBarItem } from '@/components/TabBar/types'
import { TabBarStrategy } from '@/components/TabBar/types'

/**
 * 激活的 tabbar 类型
 * 默认值为 'custom'，表示使用自定义的 TabBar
 * 当选择为 'native' 时，表示使用原生的 TabBar，需要自行在pages.config.ts中配置
 */
export const strategy: TabBarStrategy = TabBarStrategy.CUSTOM

/**
 * 自定义TabBar的Item配置
 */
export const tabBarItems: TabBarItem[] = [
  {
    pagePath: 'pages/index/index',
    text: '首页',
    icon: 'home',
    iconType: 'wot',
  },
  {
    pagePath: 'pages/mine/index',
    text: '我的',
    icon: 'user',
    iconType: 'wot',
  },
]
