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
    "navigationBarTitleText": "Area Select 省市区选择器",
    // #ifdef H5
    "navigationStyle": "custom"
    // #endif
  }
}
</route>
