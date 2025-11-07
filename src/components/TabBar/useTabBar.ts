import type { TabBarItem } from './types'
import { computed, reactive } from 'vue'
import { useRoute } from '@/router'
import { strategy, tabBarItems } from '@/settings/tabbarSettings'
import { TabBarStrategy } from './types'

const tabbarState = reactive<TabBarItem[]>(tabBarItems.map(item => ({ ...item })))

export function useTabBarInner() {
  const route = useRoute()

  function isPageTabBar(path: string) {
    return tabbarState.some(item => item.pagePath === path)
  }

  const getTabBar = computed(() => tabbarState)
  const getCurrentPagePath = computed(() => route.path)

  /**
   * 当前激活的 TabBar 策略
   */
  const getStrategy = computed((): TabBarStrategy => {
    return strategy
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
