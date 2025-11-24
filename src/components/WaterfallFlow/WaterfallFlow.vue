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

const getDelay = computed((): number => {
  const val = Number(props.delay)
  return Number.isFinite(val) && val > 0 ? val : 0
})

const uid = `waterfall-${Math.random().toString(36).slice(2, 10)}`
const leftColumnId = `${uid}-left`
const rightColumnId = `${uid}-right`
const leftSelector = `#${leftColumnId}`
const rightSelector = `#${rightColumnId}`

const leftItemsRef = ref<any[]>([])
const rightItemsRef = ref<any[]>([])

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
    const [leftRect, rightRect] = await Promise.all([
      getRect(leftSelector),
      getRect(rightSelector),
    ])

    const item = tmpItemsRef.value.shift()
    if (!item) {
      break
    }

    const leftHeight = (leftRect?.height as number | undefined) ?? 0
    const rightHeight = (rightRect?.height as number | undefined) ?? 0

    if (leftHeight <= rightHeight) {
      leftItemsRef.value.push(item)
    }
    else {
      rightItemsRef.value.push(item)
    }

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

  leftItemsRef.value = leftItemsRef.value.map((item) => {
    const id = resolveId(item)
    if (id && map.has(id)) {
      return map.get(id)
    }
    return item
  })

  rightItemsRef.value = rightItemsRef.value.map((item) => {
    const id = resolveId(item)
    if (id && map.has(id)) {
      return map.get(id)
    }
    return item
  })
}

function initializeColumns() {
  leftItemsRef.value = []
  rightItemsRef.value = []
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
  },
)

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
  leftItemsRef.value = leftItemsRef.value.filter(item => !idsToReflow.has(resolveId(item)!))
  rightItemsRef.value = rightItemsRef.value.filter(item => !idsToReflow.has(resolveId(item)!))

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
  leftItemsRef.value = leftItemsRef.value.filter(item => !predicate(item))
  rightItemsRef.value = rightItemsRef.value.filter(item => !predicate(item))

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
      :id="leftColumnId"
      class="waterfall__column"
      :class="customColumnClass"
      :style="customColumnStyle"
    >
      <slot name="left" :left-items="leftItemsRef" :items="leftItemsRef" />
    </view>

    <view
      :id="rightColumnId"
      class="waterfall__column"
      :class="customColumnClass"
      :style="customColumnStyle"
    >
      <slot name="right" :right-items="rightItemsRef" :items="rightItemsRef" />
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
