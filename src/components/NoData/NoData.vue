<script setup lang="ts">
import { computed } from 'vue'

type StatusType = 'empty' | 'loading' | 'error'

const props = defineProps({
  status: {
    type: String as PropType<StatusType>,
    default: 'empty',
  },
  customClass: {
    type: String,
    default: '',
  },
  customStyle: {
    type: String,
    default: '',
  },
  emptyTip: {
    type: String,
    default: '暂无内容',
  },
  errorTip: {
    type: String,
    default: '加载失败',
  },
  extraTip: {
    type: Array as PropType<[string | number, StatusType?][]>,
    default: () => [],
  },
  icon: {
    type: String,
    default: '',
  },
})

defineEmits(['click'])

const getExtraTip = computed((): string[] => {
  if (!props.extraTip) {
    return []
  }

  return props.extraTip
    .filter((item) => {
      if (item.length === 1) {
        return true
      }
      return item[1] === props.status
    })
    .map(item => `${item[0]}`)
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
  <view
    class="box-border flex flex-col items-center justify-center gap-[32rpx] py-[32rpx]"
    :class="customClass"
    :style="customStyle"
  >
    <!-- 无数据/加载错误 -->
    <view v-if="status === 'empty' || status === 'error'" class="box-border position-relative">
      <slot :name="status">
        <view class="flex flex-col items-center gap-[32rpx]" @click="$emit('click', status)">
          <i
            class="text-neutral-300 text-[180rpx]"
            :class="icon || status === 'empty' ? 'i-fluent-slide-search-16-regular' : 'i-uiw-reload'"
          />

          <!-- 标题 -->
          <text class="text-[32rpx] font-bold text-label-secondary">
            {{ status === 'empty' ? emptyTip : errorTip }}
          </text>

          <!-- 额外提示 -->
          <text v-if="getExtraTip.length > 0" class="text-[26rpx] text-label-tertiary text-center leading-relaxed">
            <view v-for="(tip, index) in getExtraTip" :key="`tip-${index}-${tip}`">
              {{ tip }}
            </view>
          </text>
        </view>
      </slot>
    </view>

    <!-- 加载中 -->
    <view v-if="status === 'loading'" class="box-border position-relative">
      <slot name="loading">
        <wd-loading />
      </slot>
    </view>

    <!-- 追加内容 -->
    <slot name="extra" :status="status" />
  </view>
</template>
