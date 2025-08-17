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

<route lang="json">
{
  "name": "user",
  "layout": "navigation",
  "style": {
    "navigationBarTitleText": "User",
    "navigationStyle": "custom"
  }
}
</route>
