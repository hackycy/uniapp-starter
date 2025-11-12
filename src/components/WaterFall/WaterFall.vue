<script setup lang="ts">
import { computed } from 'vue'
import { basicProps } from './types'

const props = defineProps(basicProps)

const getColumnIds = computed((): string[] => {
  return Array.from({ length: props.column }, (_, i) => `waterfall-column-${i}`)
})
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
  <view class="waterfall" :class="customClass" :style="customStyle">
    <view
      v-for="columnId in getColumnIds"
      :id="columnId"
      :key="columnId"
      class="waterfall__column"
      :class="[customColumnClass]"
      :style="customColumnStyle"
    >
      <slot :name="columnId" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.waterfall {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24rpx;

  &__column {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 24rpx;
  }
}
</style>
