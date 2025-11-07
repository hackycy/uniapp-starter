import type { TabBarConfig, TabBarItem } from './types'
import { computed, reactive } from 'vue'
import { useRoute } from '@/router'
import { defaultTabBarConfig } from '@/settings/tabbarSettings'
import { TabBarStrategy } from './types'

/**
 * 创建 TabBar 实例
 * @param config TabBar 配置，如果不传则使用全局默认配置
 */
export function useTabBarInner(config?: TabBarConfig) {
  const route = useRoute()

  // 如果传入配置则使用传入的，否则使用全局默认配置
  const tabbarConfig = config || defaultTabBarConfig
  const tabbarState = reactive<TabBarItem[]>(tabbarConfig.items.map((item: TabBarItem) => ({ ...item })))

  function isPageTabBar(path: string) {
    return tabbarState.some(item => item.pagePath === path)
  }

  const getTabBar = computed(() => tabbarState)
  const getCurrentPagePath = computed(() => route.path)

  /**
   * 当前激活的 TabBar 策略
   */
  const getStrategy = computed((): TabBarStrategy => {
    return tabbarConfig.strategy
  })

  const getShowTabBar = computed(() => {
    if ([TabBarStrategy.CUSTOM].includes(getStrategy.value)) {
      return isPageTabBar(getCurrentPagePath.value!)
    }
    return false
  })

  return {
    isPageTabBar,
    getTabBar,
    getShowTabBar,
    getStrategy,
    getCurrentPagePath,
  }
}
