<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const currentTabRef = ref('home')

onLoad(() => {
  // #ifdef APP-PLUS
  uni.hideTabBar()
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
