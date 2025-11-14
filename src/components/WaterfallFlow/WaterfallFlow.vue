<script setup lang="ts">
import type { WaterfallItem } from './types'
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { basicProps } from './types'
import { cloneData, delay } from './utils'

const props = defineProps(basicProps)

const getColumns = computed((): number => {
  return Number(props.columns)
})

const getColumnIds = computed((): string[] => {
  return Array.from({ length: getColumns.value }, (_, i) => `waterfall-column-${i}`)
})

const getColumnSelectors = computed((): string[] => {
  return getColumnIds.value.map(id => `#${id}`)
})

const getDelay = computed((): number => {
  const val = Number(props.delay)
  return Number.isFinite(val) && val > 0 ? val : 0
})

// 动态列数组
const waterfallItemColumnsRef = ref<WaterfallItem[][]>([])

const internalItemsRef = ref<WaterfallItem[]>([])
const tmpItemsRef = ref<WaterfallItem[]>([])

const isSplittingRef = ref(false)
const pendingSplitRef = ref(false)

// 组件是否挂载完成
const isMountedRef = ref(false)

const getClonedValue = computed<WaterfallItem[]>(() => cloneData(props.modelValue ?? []))

const instance = getCurrentInstance()

async function runSplit() {
  if (isSplittingRef.value) {
    return
  }

  // 组件未挂载完成，等待挂载完成后再执行分配
  if (!isMountedRef.value) {
    pendingSplitRef.value = true
    return
  }

  isSplittingRef.value = true
  await splitLoop()
  isSplittingRef.value = false

  if (tmpItemsRef.value.length) {
    // 继续分配剩余数据
    await runSplit()
  }
}

async function splitLoop() {
  while (tmpItemsRef.value.length) {
    await nextTick()

    // 获取各列高度
    const promises = getColumnSelectors.value.map(selector => getRect(selector))
    const resolvedRects = await Promise.all(promises)
    const columnHeights = resolvedRects.map(rect => (rect ? rect.height : 0))

    const item = tmpItemsRef.value.shift()
    if (!item) {
      break
    }

    // 找到高度最小的列
    const minHeightIdx = columnHeights.indexOf(Math.min(...columnHeights))
    waterfallItemColumnsRef.value[minHeightIdx].push(item)

    // 判断是否需要延迟
    if (tmpItemsRef.value.length && getDelay.value > 0) {
      await delay(getDelay.value)
    }
  }
}

function syncLists(source: WaterfallItem[]) {
  const map = new Map<string, WaterfallItem>()
  source.forEach((item) => {
    const id = resolveId(item)
    if (id) {
      map.set(id, item)
    }
  })

  if (!map.size) {
    return
  }

  // 更新所有列中的数据
  waterfallItemColumnsRef.value = waterfallItemColumnsRef.value.map((column) => {
    return column.map((item) => {
      const id = resolveId(item)
      return id && map.has(id) ? cloneData(map.get(id)!) : item
    })
  })
}

function initializeColumns() {
  waterfallItemColumnsRef.value = Array.from({ length: getColumns.value }, () => [])
}

function reflowWith(items: WaterfallItem[]) {
  initializeColumns()
  tmpItemsRef.value = cloneData(items)
  runSplit()
}

function resolveId(item?: WaterfallItem) {
  if (!item) {
    return
  }

  const val = item[props.itemKey]
  return val !== undefined && val !== null ? String(val) : undefined
}

function hasStableIds(items: WaterfallItem[]) {
  return items.every(item => resolveId(item) !== undefined)
}

function isSameItem(a?: WaterfallItem, b?: WaterfallItem) {
  const aId = resolveId(a)
  const bId = resolveId(b)

  if (aId !== undefined && bId !== undefined) {
    return aId === bId
  }

  if (!a || !b) {
    return false
  }

  return a === b
}

function getRect(selector: string): Promise<{ height: number } | null> {
  return new Promise((resolve) => {
    const query = instance?.proxy ? uni.createSelectorQuery().in(instance.proxy) : uni.createSelectorQuery()
    query
      .select(selector)
      .boundingClientRect((rect) => {
        if (!rect || Array.isArray(rect)) {
          resolve({ height: 0 })
          return
        }

        const height = typeof rect.height === 'number' ? rect.height : 0
        resolve({ height })
      })
      .exec()
  })
}

watch(
  getClonedValue,
  (newVal, oldVal) => {
    const prev = Array.isArray(oldVal) ? oldVal : []
    internalItemsRef.value = cloneData(newVal)

    if (!newVal.length) {
      tmpItemsRef.value = []
      initializeColumns()
      return
    }

    const diff = newVal.length - prev.length

    if (!prev.length) {
      tmpItemsRef.value = cloneData(newVal)
      runSplit()
      return
    }

    // 数据无法稳定识别，则全部重新分配
    if (!hasStableIds([...prev, ...newVal])) {
      reflowWith(newVal)
      return
    }

    if (diff < 0) {
      reflowWith(newVal)
      return
    }

    // 检查已有数据是否一致
    const prevMatches = prev.every((item, idx) => isSameItem(item, newVal[idx]))
    // 有数据变更，则全部重新分配
    if (!prevMatches) {
      reflowWith(newVal)
      return
    }

    // 增量更新
    if (diff > 0) {
      const addedItems = newVal.slice(prev.length)
      if (addedItems.length) {
        tmpItemsRef.value.push(...addedItems)
        runSplit()
      }
    }

    syncLists(newVal)
  },
  {
    immediate: true,
  },
)

watch(getColumns, (newCount, oldCount) => {
  if (newCount !== oldCount) {
    initializeColumns()
    // 重新分配数据
    reflowWith(internalItemsRef.value)
  }
})

onMounted(() => {
  isMountedRef.value = true
  initializeColumns()

  if (pendingSplitRef.value || tmpItemsRef.value.length) {
    pendingSplitRef.value = false
    runSplit()
  }
})

defineExpose({
  reflow: () => {
    reflowWith(internalItemsRef.value)
  },
  clear: () => {
    tmpItemsRef.value = []
    initializeColumns()
    internalItemsRef.value = []
  },
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
      <slot :name="columnId" :column-idx="index" :items="waterfallItemColumnsRef[index]" />
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
