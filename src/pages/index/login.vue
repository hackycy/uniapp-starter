<script setup lang="ts">
import { useProgressSimulator } from '@/composables/web/useProgressSimulator'

const { getProgress } = useProgressSimulator({
  initialProgress: 0.2,
})
</script>

<template>
  <view>
    <wd-progress :percentage="getProgress" hide-text color="#00c740" class="!p-0 position-fixed top-0 left-0 right-0" />
  </view>
</template>

<route lang="json">
{
  "name": "Login",
  "layout": "default",
  "style": {
    "navigationBarTitleText": "Login",
    "navigationStyle": "custom"
  }
}
</route>
