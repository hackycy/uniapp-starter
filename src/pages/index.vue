<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '@/router'
import { setupDevtool } from '@/utils/env'

const router = useRouter()

interface CasePage {
  title: string
  icon: string
  click?: () => void
}

const casePagesRef = ref<CasePage[]>([
  {
    icon: 'i-codicon-debug-console',
    title: 'VConsole调试',
    click: () => {
      setupDevtool()
    },
  },
  {
    title: '瀑布流',
    icon: 'i-icon-park-outline-waterfalls-h',
    click: () => {
      router.push('/pages/demo/waterfall-flow')
    },
  },
  {
    title: 'WebView',
    icon: 'i-icon-park-outline-browser-chrome',
  },
])

function handle(c: CasePage) {
  c.click?.()
}
</script>

<template>
  <view class="relative min-h-screen box-border px-[24rpx] py-[28rpx]">
    <view class="mb-[28rpx] flex items-center justify-between">
      <view>
        <view class="text-[40rpx] font-semibold text-gray-900">
          组件案例集
        </view>
        <view class="mt-[8rpx] text-[26rpx] text-gray-500">
          快速浏览常用业务与视觉实现
        </view>
      </view>
      <view class="flex h-[96rpx] w-[96rpx] items-center justify-center rounded-full bg-white/80 shadow-lg">
        <view class="i-tabler-windmill text-[56rpx] text-primary animate-spin" />
      </view>
    </view>

    <view class="grid grid-cols-2 gap-[24rpx]">
      <view
        v-for="(item, idx) in casePagesRef"
        :key="`${item.title}-${idx}`"
        class="relative overflow-hidden rounded-[22rpx] bg-white active:scale-[0.98] active:brightness-90 transition-transform duration-200"
        @tap="handle(item)"
      >
        <view class="block pb-[100%]" />
        <view
          class="absolute inset-[14rpx] flex h-auto flex-col items-center justify-center rounded-[18rpx] px-[16rpx] text-center"
        >
          <view
            class="mb-[16rpx] flex h-[132rpx] w-[132rpx] items-center justify-center rounded-full bg-white/80 shadow-md"
          >
            <view class="text-[64rpx] text-primary" :class="[item.icon]" />
          </view>

          <view class="text-[30rpx] font-medium text-gray-900 mt-[20rpx]">
            {{ item.title }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
