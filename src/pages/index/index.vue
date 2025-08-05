<script setup lang="ts">
import { ref } from 'vue'
import platform from '@/utils/platform'

const title = ref('Hello')
</script>

<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
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

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
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
  "layout": "navigation",
  "style": {
    "navigationBarTitleText": "首页"
  }
}
</route>
