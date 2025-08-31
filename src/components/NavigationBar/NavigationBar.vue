<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed } from 'vue'
import { useRoute } from '@/router'
import {
  activeTabBarStrategy,
  customTabBarEnable,
  defaultTabBarItems,
  TabBarStrategy,
} from '@/settings/tabbarSettings'

const route = useRoute()

const getCurrentPagePath = computed(() => {
  return route.path
})

function handleTabChange(arg: Recordable) {
  uni.redirectTo({
    url: `/${arg.value}`,
  })
}

onLoad(() => {
  // #ifdef APP-PLUS
  if (activeTabBarStrategy === TabBarStrategy.CUSTOM || activeTabBarStrategy === TabBarStrategy.NONE) {
    uni.hideTabBar()
  }
  // #endif
})
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
    v-if="customTabBarEnable"
    :model-value="getCurrentPagePath"
    bordered
    safe-area-inset-bottom
    placeholder
    fixed
    @change="handleTabChange"
  >
    <wd-tabbar-item
      v-for="item in defaultTabBarItems"
      :key="item.pagePath"
      :name="item.pagePath"
      :title="item.text"
      :icon="item.icon"
    />
  </wd-tabbar>
</template>
