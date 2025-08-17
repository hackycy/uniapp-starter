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
  "name": "Login",
  "layout": "default",
  "style": {
    "navigationBarTitleText": "Login",
    "navigationStyle": "custom"
  }
}
</route>
