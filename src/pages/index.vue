<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from '@/router'

const router = useRouter()

interface CasePage {
  title: string
  icon: string
  click?: () => void
}

interface CaseCategory {
  key: string
  label: string
  items: CasePage[]
}

const caseCategoriesRef = ref<CaseCategory[]>([
  {
    key: 'basic',
    label: '基础',
    items: [
      {
        icon: 'i-codicon-debug-console',
        title: 'VConsole 调试面板',
        click: () => {
          router.push('/pages/demo/vconsole')
        },
      },
      {
        icon: 'i-ic-twotone-data-object',
        title: 'Wot-UI 组件库',
        click: () => {
          router.push('/pages/demo/wot-ui')
        },
      },
      {
        icon: 'i-ic-outline-color-lens',
        title: '主题切换',
        click: () => {
          router.push('/pages/demo/theme-switch')
        },
      },
      {
        icon: 'i-simple-icons-unocss',
        title: 'UnoCSS 图标使用',
        click: () => {
          router.push('/pages/demo/unocss-icons')
        },
      },
      {
        icon: 'i-mdi-wechat',
        title: '微信JS-SDK集成',
        click: () => {
          router.push('/pages/demo/jweixin-sdk')
        },
      },
    ],
  },
  {
    key: 'advanced',
    label: '高级',
    items: [
      {
        title: '瀑布流',
        icon: 'i-icon-park-outline-waterfalls-v',
        click: () => {
          router.push('/pages/demo/waterfall')
        },
      },
      {
        title: '省市区选择器',
        icon: 'i-mdi-map-marker-radius',
        click: () => {
          router.push('/pages/demo/area-select')
        },
      },
      {
        title: 'z-paging',
        icon: 'i-ph-scribble-loop-bold',
        click: () => {
          router.push('/pages/demo/z-paging')
        },
      },
    ],
  },
])

const activeCategoryKey = ref(caseCategoriesRef.value[0]?.key ?? '')

const casePagesRef = computed(() => {
  return (
    caseCategoriesRef.value.find(category => category.key === activeCategoryKey.value)?.items ?? []
  )
})

function handle(c: CasePage) {
  c.click?.()
}

function setActiveCategory(key: string) {
  activeCategoryKey.value = key
}
</script>

<template>
  <view
    class="relative min-h-screen box-border px-[24rpx] py-[28rpx] bg-[radial-gradient(circle_at_25%_15%,#fff9f2_0%,#f3f6ff_58%,#ecf2ff_100%)] dark:bg-[radial-gradient(circle_at_30%_10%,#1b2a44_0%,#0f172a_60%,#050b18_100%)]"
  >
    <view class="mb-[28rpx] flex items-center justify-between">
      <view>
        <view class="text-[40rpx] font-semibold text-gray-900 dark:text-gray-100">
          组件案例集
        </view>
        <view class="mt-[8rpx] text-[26rpx] text-gray-500 dark:text-gray-400">
          快速浏览常用业务与视觉实现
        </view>
      </view>
      <view class="flex h-[96rpx] w-[96rpx] items-center justify-center rounded-full bg-white/80 shadow-lg dark:bg-white/10">
        <view class="i-icon-park-twotone-windmill-two text-[56rpx] text-primary animate-spin animate-duration-3000" />
      </view>
    </view>

    <view
      class="mb-[24rpx] flex gap-[16rpx] rounded-[28rpx] border border-white/80 bg-white/60 p-[8rpx] shadow-[0_12rpx_36rpx_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-white/5 dark:bg-white/5 dark:shadow-[0_12rpx_36rpx_rgba(7,11,23,0.85)]"
    >
      <view
        v-for="category in caseCategoriesRef"
        :key="category.key"
        class="flex-1 rounded-[22rpx] px-[24rpx] py-[18rpx] text-center text-[28rpx] font-medium transition-all duration-200 active:scale-[0.98]"
        :class="[
          activeCategoryKey === category.key
            ? 'bg-white text-gray-900 shadow-[0_12rpx_28rpx_rgba(15,23,42,0.08)] dark:bg-[#1f2937] dark:text-white dark:shadow-[0_12rpx_28rpx_rgba(0,0,0,0.65)]'
            : 'text-gray-500 dark:text-gray-400',
        ]"
        @tap="setActiveCategory(category.key)"
      >
        {{ category.label }}
      </view>
    </view>

    <view class="grid grid-cols-3 gap-[24rpx]">
      <view
        v-for="(item, idx) in casePagesRef"
        :key="`${item.title}-${idx}`"
        class="relative overflow-hidden rounded-[22rpx] bg-white/95 border border-white/70 shadow-[0_18rpx_42rpx_rgba(15,23,42,0.08)] backdrop-blur-[3px] active:scale-[0.98] active:brightness-95 transition-transform duration-200 dark:border-white/5 dark:bg-[#0f172a]/90 dark:shadow-[0_18rpx_42rpx_rgba(0,0,0,0.75)]"
        @tap="handle(item)"
      >
        <view class="block pb-[100%]" />
        <view
          class="absolute inset-[14rpx] flex h-auto flex-col items-center justify-center rounded-[18rpx] px-[16rpx] text-center"
        >
          <view
            class="mb-[16rpx] flex items-center justify-center rounded-full bg-[#f5f7ff] shadow-md dark:bg-[#1e293b]"
            style="width: 50%; aspect-ratio: 1 / 1;"
          >
            <view class="text-[38rpx] text-primary" :class="[item.icon]" />
          </view>

          <view class="text-[20rpx] font-medium text-gray-900 mt-[20rpx] dark:text-gray-100">
            {{ item.title }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
