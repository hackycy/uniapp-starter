<script setup lang="ts">
import type { WaterfallItem } from './types'
import { computed, onMounted, ref, watch } from 'vue'
import { basicProps } from './types'
import { cloneData } from './utils'

const props = defineProps(basicProps)

const getColumns = computed((): number => {
  return Number(props.columns)
})

const getColumnIds = computed((): string[] => {
  return Array.from({ length: getColumns.value }, (_, i) => `waterfall-column-${i}`)
})

// 动态列数组
const waterfallItemColumnsRef = ref<WaterfallItem[][]>([])

// 组件是否挂载完成
const isMountedRef = ref(false)

const getClonedValue = computed<WaterfallItem[]>(() => cloneData(props.modelValue ?? []))

function initializeColumns() {
  waterfallItemColumnsRef.value = Array.from({ length: getColumns.value }, () => [])
}

watch(
  getClonedValue,
  (newVal, oldVal) => {
    const prev = Array.isArray(oldVal) ? oldVal : []

    if (!newVal.length) {
      initializeColumns()
      return
    }

    const diff = newVal.length - prev.length
  },
  {
    immediate: true,
  },
)

watch(getColumns, (newCount, oldCount) => {
  if (newCount !== oldCount) {
    // TODO: 处理列数变化时的逻辑
  }
})

onMounted(() => {
  isMountedRef.value = true
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
      v-for="(columnId, index) in getColumnIds"
      :id="columnId"
      :key="columnId"
      class="waterfall__column"
      :class="[customColumnClass]"
      :style="customColumnStyle"
    >
      <slot :name="columnId" :column-idx="index" />
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
