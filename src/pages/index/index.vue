<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import platform from '@/utils/platform'

const title = ref('Hello')

onShow((options) => {
  console.log('Index onShow', options)
})
</script>

<template>
  <view class="content">
    <div class="i-custom-uniapp size-[200rpx] logo" />
    <view class="text-area">
      <text class="title">
        {{ title }}
      </text>
      <text class="title">
        version: {{ platform.version }}
      </text>
      <text class="title">
        release: {{ platform.lastBuildTime }}
      </text>
    </view>
  </view>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

<route lang="json">
{
  "name": "Home",
  "type": "home",
  "layout": "navigation",
  "meta": {
    "auth": true
  },
  "style": {
    "navigationBarTitleText": "首页"
  }
}
</route>
