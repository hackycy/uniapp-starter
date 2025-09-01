import type { TabBarItem } from '#/store'

export enum TabBarStrategy {
  // 不显示
  NONE = 0,
  // 原生，需定义在pages.config.ts
  NATIVE = 1,
  // 自定义
  CUSTOM = 2,
}

/**
 * 激活的 tabbar 类型
 * 默认值为 'custom'，表示使用自定义的 TabBar
 * 当选择为 'native' 时，表示使用原生的 TabBar，需要自行在pages.config.ts中配置
 */
export const activeTabBarStrategy: TabBarStrategy = TabBarStrategy.CUSTOM

/**
 * 是否启用自定义TabBar
 */
export const customTabBarEnable: boolean = [TabBarStrategy.CUSTOM].includes(activeTabBarStrategy)

/**
 * 自定义TabBar的Item配置
 */
export const defaultTabBarItems: TabBarItem[] = [
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
