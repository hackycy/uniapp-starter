<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { basicProps } from './types'
import { cloneData, delay } from './utils'

const props = defineProps(basicProps)

const emit = defineEmits<{
  (event: 'reflow-start'): void
  (event: 'reflow-end'): void
  (event: 'item-removed', payload: { item: any, index: number }): void
}>()

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

// 动态列数组，用于存放分配后的数据及插槽渲染
const waterfallItemColumnsRef = ref<any[][]>([])

// 内部数据源
const internalItemsRef = ref<any[]>([])
const tmpItemsRef = ref<any[]>([])

const isSplittingRef = ref(false)
const pendingSplitRef = ref(false)

// 组件是否挂载完成
const isMountedRef = ref(false)

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
  emit('reflow-start')

  await splitLoop()
  isSplittingRef.value = false

  if (tmpItemsRef.value.length) {
    // 继续分配剩余数据
    await runSplit()
  }
  else {
    emit('reflow-end')
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

function syncLists(source: any[]) {
  const map = new Map<string, any>()
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
  waterfallItemColumnsRef.value = waterfallItemColumnsRef.value.map((column: any[]) => {
    return column.map((item) => {
      const id = resolveId(item)
      return id && map.has(id) ? cloneData(map.get(id)!) : item
    })
  })
}

function initializeColumns() {
  waterfallItemColumnsRef.value = Array.from({ length: getColumns.value }, () => [])
}

function reflowWith(items: any[]) {
  initializeColumns()
  tmpItemsRef.value = cloneData(items)
  runSplit()
}

function resolveId(item?: any) {
  if (!item) {
    return
  }

  const val = item[props.itemKey]
  return val !== undefined && val !== null ? String(val) : undefined
}

function hasStableIds(items: any[]) {
  return items.every(item => resolveId(item) !== undefined)
}

function isSameItem(a?: any, b?: any) {
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

// 获取元素尺寸信息
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
  () => props.dataSource,
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
    deep: false,
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

// Exposed methods
function reflow() {
  reflowWith(internalItemsRef.value)
}

function reflowFromIndex(startIndex: number) {
  if (!internalItemsRef.value.length) {
    return
  }

  const normalizedIndex = Math.max(0, startIndex)
  if (normalizedIndex <= 0) {
    reflow()
    return
  }

  const itemsToReflow = internalItemsRef.value.slice(normalizedIndex)
  if (!itemsToReflow.length) {
    return
  }

  const hasAllIds = itemsToReflow.every(item => resolveId(item) !== undefined)
  if (!hasAllIds) {
    reflow()
    return
  }

  const idsToReflow = new Set(itemsToReflow.map(item => resolveId(item)!))

  // Remove affected items from columns so they can be reassigned
  waterfallItemColumnsRef.value = waterfallItemColumnsRef.value.map(column =>
    column.filter((item) => {
      const id = resolveId(item)
      return !id || !idsToReflow.has(id)
    }),
  )

  tmpItemsRef.value = [...cloneData(itemsToReflow), ...tmpItemsRef.value]
  runSplit()
}

function clear() {
  tmpItemsRef.value = []
  initializeColumns()
  internalItemsRef.value = []
}

function remove(itemId: string | number) {
  const predicate = (item: any) => resolveId(item) === String(itemId)

  let removedItem: any = null
  let originalIndex = -1

  // 查找数据中的位置
  originalIndex = internalItemsRef.value.findIndex(item => predicate(item))
  if (originalIndex !== -1) {
    removedItem = internalItemsRef.value[originalIndex]
  }

  if (!removedItem) {
    return
  }

  // 从内部数据源中移除
  waterfallItemColumnsRef.value = waterfallItemColumnsRef.value.map(column =>
    column.filter(item => !predicate(item)),
  )
  tmpItemsRef.value = tmpItemsRef.value.filter(item => !predicate(item))
  internalItemsRef.value = internalItemsRef.value.filter(item => !predicate(item))
  reflowFromIndex(originalIndex)

  emit('item-removed', { item: removedItem, index: originalIndex })
}

defineExpose({
  reflow,
  clear,
  remove,
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

<style scoped>
.waterfall {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24rpx;
}

.waterfall__column {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 24rpx;
}
</style>
