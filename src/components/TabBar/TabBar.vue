<script setup lang="ts">
import { useRouter } from '@/router'
import { useTabBarInner } from './useTabBar'

const router = useRouter()
const { getTabBar, getShowTabBar, getCurrentPagePath } = useTabBarInner()

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
          :class="active && item.selectedIcon ? item.selectedIcon : item.icon"
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
