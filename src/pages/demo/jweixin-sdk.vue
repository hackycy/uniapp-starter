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
  <view class="relative h-screen box-border p-[20rpx] flex-center flex-col">
    <wd-button>初始化</wd-button>

    <!-- #ifdef H5 -->
    <FABack />
    <!-- #endif -->
  </view>
</template>

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
