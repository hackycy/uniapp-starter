import type { TabBarConfig, TabBarItem } from '@/components/TabBar/types'
import { TabBarStrategy } from '@/components/TabBar/types'

/**
 * 激活的 tabbar 类型
 * 默认值为 'custom'，表示使用自定义的 TabBar
 * 当选择为 'native' 时，表示使用原生的 TabBar，需要自行在pages.config.ts中配置
 * @deprecated 请使用 defaultTabBarConfig.strategy
 */
export const strategy: TabBarStrategy = TabBarStrategy.CUSTOM

/**
 * 自定义TabBar的Item配置
 * @deprecated 请使用 defaultTabBarConfig.items
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

/**
 * 默认 TabBar 配置
 * 用于向下兼容和作为全局默认配置
 */
export const defaultTabBarConfig: TabBarConfig = {
  strategy: TabBarStrategy.CUSTOM,
  items: [
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
  ],
}

/**
 * 创建自定义 TabBar 配置
 * @example
 * ```ts
 * // 在某个页面或布局中使用自定义配置
 * const customConfig = createTabBarConfig({
 *   strategy: TabBarStrategy.CUSTOM,
 *   items: [
 *     { pagePath: 'pages/home/index', text: '主页', icon: 'home', iconType: 'wot' },
 *     { pagePath: 'pages/profile/index', text: '个人', icon: 'user', iconType: 'wot' }
 *   ]
 * })
 * ```
 */
export function createTabBarConfig(config: TabBarConfig): TabBarConfig {
  return config
}
