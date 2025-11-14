<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const urlRef = ref<string>('')

onLoad((options) => {
  urlRef.value = options?.url || ''
})
</script>

<template>
  <view>
    <web-view :src="urlRef" />
  </view>
</template>
