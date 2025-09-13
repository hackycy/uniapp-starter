export enum TabBarStrategy {
  // 不显示
  NONE = 0,
  // 原生，需定义在pages.config.ts
  NATIVE = 1,
  // 自定义
  CUSTOM = 2,
}

export interface TabBarItem {
  /**
   * 页面路径，必须与 pages.json 中配置的路径一致
   */
  pagePath: string

  /**
   * tab 上显示的文字
   */
  text?: string

  /**
   * 选中状态下的图标路径
   */
  selectedIconPath?: string

  /**
   * 未选中状态下的图标路径
   */
  iconPath?: string

  /**
   * 图标类型
   */
  iconType?: 'iconfont' | 'unocss' | 'image' | 'wot'

  /**
   * 图标名称，当 iconType 为 iconfont / unocss 时必填
   */
  icon?: string

  /**
   * 选中状态图标，可选
   */
  selectedIcon?: string

  /**
   * TabBar 显示一个数字或小红点
   */
  badge?: number | 'dot'
}
