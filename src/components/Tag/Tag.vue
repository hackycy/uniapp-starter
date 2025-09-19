<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/core/useTheme'
import { mixLighten } from '@/utils/color'

const props = defineProps({
  // 必须为颜色值
  color: {
    type: String,
    default: '',
  },
  border: {
    type: Boolean,
    default: true,
  },
  ghost: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
  customStyle: {
    type: String,
    default: '',
  },
})

const { getPrimaryColor } = useTheme()

const getStyles = computed((): string => {
  const fontColor = props.color || getPrimaryColor.value
  const bgColor = mixLighten(fontColor, 0.9)
  const borderColor = mixLighten(fontColor, 0.7)

  let style = `color: ${fontColor};`
  if (props.border) {
    style += ` border: 1rpx solid ${borderColor};`
  }

  if (!props.ghost) {
    style += ` background-color: ${bgColor};`
  }

  return `${style} ${props.customStyle || ''}`
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
  <view class="basic-tag" :class="customClass" :style="getStyles">
    <slot />
  </view>
</template>

<style lang="scss" scoped>
.basic-tag {
  display: inline-block;
  padding: 4rpx 12rpx;
  font-size: 22rpx;
  border-radius: 8rpx;
}
</style>
