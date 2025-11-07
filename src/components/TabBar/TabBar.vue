<script setup lang="ts">
import type { TabBarConfig } from './types'
import { onLoad } from '@dcloudio/uni-app'
import { useRouter } from '@/router'
import { TabBarStrategy } from './types'
import { useTabBarInner } from './useTabBar'

interface Props {
  /**
   * 自定义 TabBar 配置
   * 如果不传，则使用全局默认配置
   */
  config?: TabBarConfig
}

const props = defineProps<Props>()

const router = useRouter()
const { getTabBar, getShowTabBar, getCurrentPagePath, getStrategy } = useTabBarInner(props.config)

onLoad(() => {
  // #ifdef APP-PLUS
  if ([TabBarStrategy.CUSTOM, TabBarStrategy.NONE].includes(getStrategy.value)) {
    uni.hideTabBar()
  }
  // #endif
})

function handleTabChange(arg: Recordable) {
  if (getCurrentPagePath.value === arg.value) {
    return
  }

  router.replace({
    path: `/${arg.value}`,
  })
}
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <wd-tabbar
    v-if="getShowTabBar"
    :model-value="getCurrentPagePath"
    bordered
    safe-area-inset-bottom
    placeholder
    fixed
    @change="handleTabChange"
  >
    <wd-tabbar-item v-for="item in getTabBar" :key="item.pagePath" :name="item.pagePath" :title="item.text">
      <template #icon="{ active }">
        <wd-icon
          v-if="item.iconType === 'wot'"
          :name="item.icon!"
          :custom-class="`${active ? 'is-active' : 'is-inactive'}`"
          size="20"
        />
        <view
          v-else-if="item.iconType === 'unocss' || item.iconType === 'iconfont'"
          :class="[active && item.selectedIcon ? item.selectedIcon : item.icon, active ? 'is-active' : 'is-inactive']"
          class="text-[20px]"
        />
        <wd-img
          v-else-if="item.iconType === 'image'"
          height="20"
          width="20"
          :src="active ? item.selectedIconPath : item.iconPath"
        />
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
</template>
