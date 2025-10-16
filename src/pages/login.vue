<script setup lang="ts">
import { useProgressSimulator } from '@/composables/web/useProgressSimulator'

const { getProgress } = useProgressSimulator({
  initialProgress: 0.2,
})
</script>

<template>
  <view>
    <wd-progress
      :percentage="getProgress"
      hide-text
      color="#07c160"
      custom-class="!p-0 position-fixed top-0 left-0 right-0"
    />
  </view>
</template>
