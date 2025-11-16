<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'

type WaterfallItem = Record<string, any>

const props = defineProps({
  modelValue: {
    type: Array as PropType<WaterfallItem[]>,
    default: () => [],
  },
  addTime: {
    type: [Number, String] as PropType<number | string>,
    default: 50,
  },
  idKey: {
    type: String,
    default: 'id',
  },
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: WaterfallItem[]): void
}>()

const leftList = ref<WaterfallItem[]>([])
const rightList = ref<WaterfallItem[]>([])
const tempList = ref<WaterfallItem[]>([])
const internalValue = ref<WaterfallItem[]>(cloneData(props.modelValue ?? []))
const isMounted = ref(false)
const isSplitting = ref(false)
const pendingSplit = ref(false)

const instance = getCurrentInstance()
const uid = `waterfall-${Math.random().toString(36).slice(2, 10)}`
const leftColumnId = `${uid}-left`
const rightColumnId = `${uid}-right`
const leftSelector = `#${leftColumnId}`
const rightSelector = `#${rightColumnId}`

const addDelay = computed(() => {
  const value = Number(props.addTime)
  return Number.isFinite(value) && value > 0 ? value : 0
})

const clonedValue = computed<WaterfallItem[]>(() => cloneData(props.modelValue ?? []))

watch(
  clonedValue,
  (newVal, oldVal) => {
    const prev = Array.isArray(oldVal) ? oldVal : []
    internalValue.value = cloneData(newVal)

    if (!newVal.length) {
      tempList.value = []
      leftList.value = []
      rightList.value = []
      return
    }

    const diff = newVal.length - prev.length

    if (!prev.length) {
      tempList.value = cloneData(newVal)
      runSplit()
      return
    }

    if (!hasStableIds([...prev, ...newVal])) {
      reflowWith(newVal)
      return
    }

    if (diff < 0) {
      reflowWith(newVal)
      return
    }

    const prefixMatches = prev.every((item, idx) => isSameItem(item, newVal[idx]))
    if (!prefixMatches) {
      reflowWith(newVal)
      return
    }

    if (diff > 0) {
      const appended = newVal.slice(prev.length)
      if (appended.length) {
        tempList.value = tempList.value.concat(cloneData(appended))
        runSplit()
      }
    }

    syncLists(newVal)
  },
  { immediate: true },
)

onMounted(() => {
  isMounted.value = true
  if (pendingSplit.value || tempList.value.length) {
    pendingSplit.value = false
    runSplit()
  }
})

async function runSplit() {
  if (isSplitting.value)
    return
  if (!isMounted.value) {
    pendingSplit.value = true
    return
  }

  isSplitting.value = true
  await splitLoop()
  isSplitting.value = false

  if (tempList.value.length) {
    runSplit()
  }
}

async function splitLoop() {
  while (tempList.value.length) {
    await nextTick()

    const [leftRect, rightRect] = await Promise.all([
      getRect(leftSelector),
      getRect(rightSelector),
    ])

    const item = tempList.value.shift()
    if (!item)
      break

    const leftHeight = (leftRect?.height as number | undefined) ?? 0
    const rightHeight = (rightRect?.height as number | undefined) ?? 0

    if (leftHeight <= rightHeight) {
      leftList.value.push(item)
    }
    else {
      rightList.value.push(item)
    }

    if (tempList.value.length && addDelay.value > 0) {
      await delay(addDelay.value)
    }
  }
}

function syncLists(source: WaterfallItem[]) {
  const map = new Map<string | number, WaterfallItem>()
  source.forEach((item) => {
    const id = resolveId(item)
    if (id !== undefined) {
      map.set(id, cloneData(item))
    }
  })

  if (!map.size)
    return

  leftList.value = leftList.value.map((item) => {
    const id = resolveId(item)
    return id !== undefined && map.has(id) ? cloneData(map.get(id)!) : item
  })

  rightList.value = rightList.value.map((item) => {
    const id = resolveId(item)
    return id !== undefined && map.has(id) ? cloneData(map.get(id)!) : item
  })
}

function reflowWith(data: WaterfallItem[]) {
  leftList.value = []
  rightList.value = []
  tempList.value = cloneData(data)
  runSplit()
}

function clear() {
  tempList.value = []
  leftList.value = []
  rightList.value = []
  internalValue.value = []
  emit('update:modelValue', [])
}

function remove(id: string | number) {
  const predicate = (item: WaterfallItem) => resolveId(item) === id
  leftList.value = leftList.value.filter(item => !predicate(item))
  rightList.value = rightList.value.filter(item => !predicate(item))
  tempList.value = tempList.value.filter(item => !predicate(item))

  const nextValue = internalValue.value.filter(item => !predicate(item))
  internalValue.value = cloneData(nextValue)
  emit('update:modelValue', cloneData(nextValue))
}

function modify(id: string | number, key: string, value: unknown) {
  const updater = (list: WaterfallItem[]) => {
    const index = list.findIndex(item => resolveId(item) === id)
    if (index !== -1) {
      const next = { ...list[index], [key]: value }
      list.splice(index, 1, next)
    }
  }

  updater(leftList.value)
  updater(rightList.value)

  const nextValue = internalValue.value.map((item) => {
    if (resolveId(item) === id) {
      return { ...item, [key]: value }
    }
    return item
  })

  internalValue.value = cloneData(nextValue)
  emit('update:modelValue', cloneData(nextValue))
}

function reflow() {
  reflowWith(internalValue.value)
}

function resolveId(item?: WaterfallItem) {
  if (!item)
    return undefined
  const value = item[props.idKey]
  return value !== undefined && value !== null ? (value as string | number) : undefined
}

function hasStableIds(list: WaterfallItem[]) {
  return list.every(item => resolveId(item) !== undefined)
}

function isSameItem(a?: WaterfallItem, b?: WaterfallItem) {
  const idA = resolveId(a)
  const idB = resolveId(b)
  if (idA !== undefined || idB !== undefined) {
    return idA === idB
  }

  try {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  catch (error) {
    return a === b
  }
}

function cloneData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
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

defineExpose({
  leftList,
  rightList,
  clear,
  remove,
  modify,
  reflow,
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
  <view class="waterfall">
    <view :id="leftColumnId" class="waterfall__column">
      <slot name="left" :left-list="leftList" :items="leftList" />
    </view>
    <view :id="rightColumnId" class="waterfall__column">
      <slot name="right" :right-list="rightList" :items="rightList" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.waterfall {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.waterfall__column {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  gap: 24rpx;

  &:first-of-type {
    margin-right: 24rpx;
  }
}
</style>
