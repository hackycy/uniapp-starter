<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed } from 'vue'
import { useRoute } from '@/router'
import {
  Active_Tabbar_Type,
  Default_Tabbar_Items,
} from '@/settings/tabbarSettings'

const route = useRoute()

const getCurrPage = computed(() => {
  return route.path
})

function handleTabChange(arg: Recordable) {
  uni.redirectTo({
    url: `/${arg.value}`,
  })
}

onLoad(() => {
  // #ifdef APP-PLUS
  if (Active_Tabbar_Type === 'custom' || Active_Tabbar_Type === 'none') {
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
    v-if="Active_Tabbar_Type === 'custom'"
    :model-value="getCurrPage"
    bordered
    safe-area-inset-bottom
    placeholder
    fixed
    @change="handleTabChange"
  >
    <wd-tabbar-item
      v-for="item in Default_Tabbar_Items"
      :key="item.pagePath"
      :name="item.pagePath"
      :title="item.text"
      :icon="item.icon"
    />
  </wd-tabbar>
</template>
