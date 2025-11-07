/**
 * TabBar 配置示例
 * 展示如何创建和使用多种 TabBar 配置
 */

import { TabBarStrategy } from '@/components/TabBar/types'
import { createTabBarConfig } from './tabbarSettings'

/**
 * 示例 1: 管理后台的 TabBar 配置
 */
export const adminTabBarConfig = createTabBarConfig({
  strategy: TabBarStrategy.CUSTOM,
  items: [
    {
      pagePath: 'pages/admin/dashboard',
      text: '控制台',
      icon: 'chart-line',
      iconType: 'wot',
    },
    {
      pagePath: 'pages/admin/users',
      text: '用户管理',
      icon: 'user-group',
      iconType: 'wot',
    },
    {
      pagePath: 'pages/admin/settings',
      text: '设置',
      icon: 'setting',
      iconType: 'wot',
    },
  ],
})

/**
 * 示例 2: 电商应用的 TabBar 配置
 */
export const shopTabBarConfig = createTabBarConfig({
  strategy: TabBarStrategy.CUSTOM,
  items: [
    {
      pagePath: 'pages/shop/home',
      text: '首页',
      icon: 'home',
      iconType: 'wot',
    },
    {
      pagePath: 'pages/shop/category',
      text: '分类',
      icon: 'apps',
      iconType: 'wot',
    },
    {
      pagePath: 'pages/shop/cart',
      text: '购物车',
      icon: 'cart',
      iconType: 'wot',
    },
    {
      pagePath: 'pages/shop/profile',
      text: '我的',
      icon: 'user',
      iconType: 'wot',
    },
  ],
})

/**
 * 示例 3: 使用自定义图标的配置
 */
export const customIconTabBarConfig = createTabBarConfig({
  strategy: TabBarStrategy.CUSTOM,
  items: [
    {
      pagePath: 'pages/index/index',
      text: '首页',
      icon: 'i-carbon-home',
      selectedIcon: 'i-carbon-home-filled',
      iconType: 'unocss',
    },
    {
      pagePath: 'pages/mine/index',
      text: '我的',
      icon: 'i-carbon-user',
      selectedIcon: 'i-carbon-user-filled',
      iconType: 'unocss',
    },
  ],
})

/**
 * 示例 4: 使用图片图标的配置
 */
export const imageTabBarConfig = createTabBarConfig({
  strategy: TabBarStrategy.CUSTOM,
  items: [
    {
      pagePath: 'pages/index/index',
      text: '首页',
      iconPath: '/static/tabbar/home.png',
      selectedIconPath: '/static/tabbar/home-active.png',
      iconType: 'image',
    },
    {
      pagePath: 'pages/mine/index',
      text: '我的',
      iconPath: '/static/tabbar/user.png',
      selectedIconPath: '/static/tabbar/user-active.png',
      iconType: 'image',
    },
  ],
})
