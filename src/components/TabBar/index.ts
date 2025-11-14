import type { TabBarConfig } from './types'

/**
 * 创建自定义 TabBar 配置
 *
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
