<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'
import FABack from '@/components/FABack/FABack.vue'

onLoad(() => {
  console.log('onLoad')
})

onShow(() => {
  console.log('onShow')
})
</script>

<template>
  <view>
    <!-- #ifdef H5 -->
    <FABack />
    <!-- #endif -->
  </view>
</template>

<style lang="scss" scoped></style>

<route lang="jsonc" part="subPackage">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "JWeixin SDK",
    // #ifdef H5
    "navigationStyle": "custom"
    // #endif
  }
}
</route>
