<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Hello')
</script>

<template>
  <view class="content">
    <view class="text-area">
      <text class="title">
        {{ title }}
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

.text-area {
  margin-top: 200rpx;
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
