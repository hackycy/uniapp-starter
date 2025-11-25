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
  <view class="min-h-screen flex-center flex-col text-label-primary">
    <text class="text-[32rpx] underline font-semibold">
      Icones 图标库
    </text>
    <text class="text-[24rpx]">
      https://icones.js.org/
    </text>

    <view class="my-[30rpx] flex flex-row flex-wrap">
      <text class="i-ph-alarm-bold text-[64rpx] m-[10rpx]" />
      <text class="i-ph-apple-logo-fill text-[64rpx] m-[10rpx] text-primary" />
      <text class="i-ph-battery-charging-fill text-[64rpx] m-[10rpx] text-yellow" />
      <text class="i-ph-bell-fill text-[64rpx] m-[10rpx] text-orange" />
      <text class="i-ph-bicycle-bold text-[64rpx] m-[10rpx] text-purple" />
    </view>

    <text class="text-[32rpx] underline font-semibold">
      自定义图标
    </text>
    <text class="text-[24rpx]">
      (需放在assets/icons目录下)
    </text>

    <view class="my-[30rpx] flex flex-row flex-wrap">
      <text class="i-custom-uniapp text-[64rpx]" />
    </view>

    <view class="w-full relative box-border px-[20rpx]">
      <wd-notice-bar text="动态图标需要添加至components/Icon/icon.data.ts白名单中，否则无法识别" prefix="warn-bold" />
    </view>

    <!-- #ifdef H5 -->
    <FABack />
    <!-- #endif -->
  </view>
</template>

<route lang="jsonc" part="subPackage">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "UnoCSS 图标使用",
    // #ifdef H5
    "navigationStyle": "custom"
    // #endif
  }
}
</route>
