<script setup lang="ts">
import { ref } from 'vue'
import { basicProps } from './props'

defineProps(basicProps)

const visibleRef = ref(false)

function handleClose() {
  // TODO
}
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <view>
    <wd-popup
      v-model="visibleRef"
      position="center"
      :close-on-click-modal="false"
      lock-scroll
      custom-class="privacy-popup"
      @close="handleClose"
    >
      <!-- TODO -->
    </wd-popup>
  </view>
</template>

<style lang="scss" scoped>
:deep(.privacy-popup) {
  width: 600rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
  border-radius: 32rpx;
  overflow: hidden;
}
</style>
