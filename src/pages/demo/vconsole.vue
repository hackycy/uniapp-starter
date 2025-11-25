<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'
import FABack from '@/components/FABack/FABack.vue'
import { setupDevtool } from '@/utils/env'

function onClick() {
  setupDevtool()
}

onLoad(() => {
  console.log('onLoad')
})

onShow(() => {
  console.log('onShow')
})
</script>

<template>
  <view class="h-screen w-screen relative box-border p-[20rpx] flex-center flex-col gap-[26rpx]">
    <view class="text-[28rpx] text-label-primary font-semibold">
      开启调试面板，自动判断h5及微信小程序
    </view>

    <view class="text-[22rpx] text-label-secondary">
      H5端自动使用CDN方式引入，不会增加包体积
    </view>

    <wd-button @click="onClick">
      开启调试
    </wd-button>

    <!-- #ifdef H5 -->
    <FABack />
    <!-- #endif -->
  </view>
</template>

<route lang="jsonc" part="subPackage">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "VConsole 调试面板",
    // #ifdef H5
    "navigationStyle": "custom"
    // #endif
  }
}
</route>
