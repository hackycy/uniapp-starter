<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'
import { computed } from 'vue'
import FABack from '@/components/FABack/FABack.vue'
import { useRouter } from '@/router'

const router = useRouter()

const getRoutes = computed(() => {
  return JSON.stringify(router.routes, null, 2)
})

onLoad(() => {
  console.log('onLoad')
})

onShow(() => {
  console.log('onShow')
})
</script>

<template>
  <view class="relaive box-border p-[20rpx]">
    <view class="text-label-primary box-border bg-orange-100 dark:bg-orange-900 p-[20rpx] border-rd-[16rpx] mb-[20rpx] flex flex-col gap-[10rpx] font-bold text-[24rpx]">
      <view>通过 useRouter().routes 获取到的所有页面信息</view>
      <view>或者</view>
      <view>通过@uni-aide/unplugin-uni-pages提供的虚拟模块获取到的所有页面信息：</view>
      <view>import { pages, subPackages } from '~uni-pages'</view>
    </view>

    <view class="text-label-primary whitespace-pre box-border bg-orange-100 dark:bg-orange-900 p-[20rpx] border-rd-[16rpx] overflow-x-auto overflow-y-hidden text-[24rpx]">
      {{ getRoutes }}
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
    "navigationBarTitleText": "获取所有页面信息",
    // #ifdef H5
    "navigationStyle": "custom"
    // #endif
  }
}
</route>
