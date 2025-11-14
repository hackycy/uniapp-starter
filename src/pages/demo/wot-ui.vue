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
  <view class="min-h-screen flex-center relative box-border p-[20rpx] flex-col gap-[12rpx]">
    <wd-button>主要按钮</wd-button>
    <wd-button type="success">
      成功按钮
    </wd-button>
    <wd-button type="info">
      信息按钮
    </wd-button>
    <wd-button type="warning">
      警告按钮
    </wd-button>
    <wd-button type="error">
      危险按钮
    </wd-button>

    <view class="flex flex-row gap-[10rpx]">
      <wd-tag custom-class="space">
        标签
      </wd-tag>
      <wd-tag custom-class="space" type="primary">
        标签
      </wd-tag>
      <wd-tag custom-class="space" type="danger">
        标签
      </wd-tag>
      <wd-tag custom-class="space" type="warning">
        标签
      </wd-tag>
      <wd-tag custom-class="space" type="success">
        标签
      </wd-tag>
    </view>

    <wd-progress :percentage="30" />

    <wd-loading />

    <!-- #ifdef H5 -->
    <FABack />
    <!-- #endif -->
  </view>
</template>

<style lang="scss" scoped></style>
