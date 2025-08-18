<script setup lang="ts">
import { useProgressSimulator } from '@/composables/web/useProgressSimulator'

const { getProgress } = useProgressSimulator()
</script>

<template>
  <view>
    <wd-progress :percentage="getProgress" hide-text color="#00c740" class="!p-0" />
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
