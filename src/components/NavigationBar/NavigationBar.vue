<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { ACTIVE_TAB_BAR_TYPE } from '@/settings/tabbarSettings'

const currentTabRef = ref('home')

onLoad(() => {
  // #ifdef APP-PLUS
  if (ACTIVE_TAB_BAR_TYPE === 'custom' || ACTIVE_TAB_BAR_TYPE === 'none') {
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
    v-model="currentTabRef"
    bordered
    safe-area-inset-bottom
    placeholder
    fixed
  >
    <wd-tabbar-item title="首页" icon="home" />
    <wd-tabbar-item title="分类" icon="cart" />
    <wd-tabbar-item title="我的" icon="user" />
  </wd-tabbar>
</template>
