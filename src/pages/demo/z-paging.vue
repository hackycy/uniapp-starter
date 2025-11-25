<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'

onLoad(() => {
  console.log('onLoad')
})

onShow(() => {
  console.log('onShow')
})
</script>

<template>
  <view><!-- TODO --></view>
</template>

<route lang="jsonc" part="subPackage">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "z-paging",
    // #ifdef H5
    "navigationStyle": "custom"
    // #endif
  }
}
</route>
