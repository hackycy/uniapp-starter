<script setup lang="ts">
import FABack from '@/components/FABack/FABack.vue'
import { useTheme } from '@/composables/core/useTheme'
import { Theme_Color_Presets } from '@/settings/designSetings'

const { getPrimaryColor, setThemeColor } = useTheme()
</script>

<template>
  <view class="min-h-screen flex-center flex-col p-[20rpx] gap-[20rpx]">
    <view class="text-[32rpx] mb-[20rpx] text-label-primary font-semibold">
      主题切换示例
    </view>

    <view class="flex space-x-[20rpx]">
      <view
        v-for="(color, index) in Theme_Color_Presets"
        :key="index"
        class="w-[80rpx] h-[80rpx] rounded-[40rpx] shadow-lg cursor-pointer flex-center"
        :style="{ backgroundColor: color }"
        @click="setThemeColor(color)"
      >
        <text v-if="getPrimaryColor === color" class="i-material-symbols-check text-white text-[40rpx]" />
      </view>
    </view>

    <text class="text-primary text-[28rpx] mt-[20rpx]">
      class - text-primary
    </text>

    <text class="text-[28rpx] mt-[20rpx]" style="color: var(--wot-color-theme)">
      style="color: var(--wot-color-theme)"
    </text>

    <view class="relative">
      <wd-button>button</wd-button>
    </view>

    <view class="relative">
      <wd-tag type="primary">
        标签
      </wd-tag>
    </view>

    <!-- #ifdef H5 -->
    <FABack />
    <!-- #endif -->
  </view>
</template>
