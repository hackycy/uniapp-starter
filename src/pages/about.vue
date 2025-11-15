<script setup lang="ts">
import { computed, ref } from 'vue'
import platform from '@/utils/platform'

interface Highlight {
  title: string
  description: string
}

const repoUrl = 'https://github.com/hackycy/uniapp-starter'

const highlights = ref<Highlight[]>([
  {
    title: '工程化预设',
    description: '内置 TypeScript、ESLint、UnoCSS 等配置，快速搭建跨端应用脚手架。',
  },
  {
    title: '多端体验',
    description: '统一代码基座适配 H5、小程序与 App，保持一致的设计语言。',
  },
  {
    title: '主题易扩展',
    description: '支持主题切换与可配置的设计令牌，实现品牌化定制。',
  },
])

const appInfo = computed(() => ({
  name: 'UniApp Starter',
  version: platform.version || '1.0.0',
  release: platform.lastBuildTime || '',
}))

function handleOpenRepo() {
  // #ifdef H5
  window.open(repoUrl, '_blank')
  // #endif

  // #ifndef H5
  uni.setClipboardData({
    data: repoUrl,
    success() {
      uni.showToast({ title: '链接已复制', icon: 'none' })
    },
  })
  // #endif
}
</script>

<template>
  <view class="min-h-screen box-border flex flex-col bg-[#f5f6fa] px-[28rpx] pb-safe pt-[40rpx] dark:bg-[#060c1f]">
    <view
      class="rounded-[28rpx] bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#ec4899] p-[32rpx] text-white shadow-lg"
    >
      <view class="flex items-center justify-between">
        <view>
          <view class="text-[40rpx] font-semibold leading-[54rpx]">
            {{ appInfo.name }}
          </view>
          <view class="mt-[12rpx] text-[26rpx] text-white/80">
            一套开箱即用的跨端工程模板，集成 TypeScript、UnoCSS、状态管理等最佳实践。
          </view>
        </view>
        <view class="flex h-[120rpx] w-[120rpx] items-center justify-center rounded-[30rpx] bg-white/15">
          <view class="i-icon-park-outline-app-store text-[44rpx] " />
        </view>
      </view>
    </view>

    <view class="mt-[32rpx] grid grid-cols-1 gap-[20rpx]">
      <view
        v-for="item in highlights"
        :key="item.title"
        class="rounded-[24rpx] bg-white p-[28rpx] dark:bg-[#10192c]"
      >
        <view class="flex flex-col items-start">
          <view class="text-[30rpx] font-medium text-gray-900 dark:text-gray-100">
            {{ item.title }}
          </view>
          <view class="mt-[8rpx] text-[24rpx] leading-[34rpx] text-gray-500 dark:text-gray-400">
            {{ item.description }}
          </view>
        </view>
      </view>

      <view
        class="group relative overflow-hidden rounded-[24rpx] bg-[#0f172a] p-[28rpx] text-white shadow-lg"
        @tap="handleOpenRepo"
      >
        <view
          class="absolute -right-[60rpx] top-1/2 h-[200rpx] w-[200rpx] -translate-y-1/2 rounded-full bg-white/10"
        />
        <view class="relative flex items-center justify-between">
          <view class="relative">
            <view class="text-[32rpx] font-semibold">
              GitHub 仓库
            </view>
            <view class="mt-[8rpx] text-[24rpx] text-white/70">
              {{ repoUrl }}
            </view>
          </view>
          <view class="flex h-[90rpx] w-[90rpx] items-center justify-center rounded-full bg-white/15">
            <view class="i-icon-park-outline-github-one text-[52rpx]" />
          </view>
        </view>
        <view class="relative mt-[20rpx] text-[24rpx] text-white/70">
          点击访问仓库，了解更多实践细节。
        </view>
      </view>
    </view>

    <view class="rounded-[24rpx] px-[28rpx] py-[24rpx] text-center" style="margin-top: 200rpx">
      <view class="text-[28rpx] font-medium text-gray-900 dark:text-gray-100">
        {{ appInfo.name }}
      </view>
      <view class="mt-[6rpx] text-[24rpx] text-gray-500 dark:text-gray-400">
        版本 {{ appInfo.version }}
      </view>
      <view v-if="appInfo.release" class="mt-[4rpx] text-[22rpx] text-gray-400 dark:text-gray-500">
        构建于 {{ appInfo.release }}
      </view>
    </view>

    <view style="height: 50px" class="pb-safe" />
  </view>
</template>
