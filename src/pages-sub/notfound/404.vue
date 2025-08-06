<template>
  <view class="container">
    <view class="content">
      <view class="error-msg">页面走丢了</view>
      <view class="error-desc">抱歉，您访问的页面可能不存在</view>
      <wd-button class="btn-text" @click="goBack">返回首页</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
function goBack() {
  uni.redirectTo({
    url: '/pages/index/index'
  })
}
</script>

<style lang="scss">
.container {
  height: calc(100vh - var(--window-top));
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    text-align: center;
    backdrop-filter: blur(10px);

    .error-msg {
      font-size: 36rpx;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 20rpx;
    }

    .error-desc {
      font-size: 28rpx;
      color: #718096;
      line-height: 1.6;
      margin-bottom: 60rpx;
      max-width: 400rpx;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>

<route lang="json">
{
  "name": "PageNotFound",
  "layout": "default",
  "style": {
    "navigationStyle": "custom"
  }
}
</route>
