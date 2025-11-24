<script setup lang="ts">
import { ref } from 'vue'
import FABack from '@/components/FABack/FABack.vue'
import WaterfallFlow from '@/components/WaterfallFlow/WaterfallFlow.vue'

interface GoodsItem {
  id: string
  height: number
  title: string
  marketPrice: number
  sellPrice: number
  tag: string
}

const waterfallFlowRef = ref<InstanceType<typeof WaterfallFlow> | null>(null)

const TITLE_POOL = [
  '新奇周边灵感合集',
  '便携轻户外装备',
  '复古收纳桌面件',
  '夏日早餐灵感包',
  '手作香薰礼盒',
  '旅行速干衣精选',
  '数码随身配件',
  '趣味互动盲盒',
]

const TAG_POOL = ['热销', '精选', '新品', '特惠', '限量']
const PAGE_SIZE = 10

let seed = 1

function removeItem(itemId: string) {
  waterfallFlowRef.value?.remove(itemId)
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createItem(): GoodsItem {
  const title = TITLE_POOL[randomInt(0, TITLE_POOL.length - 1)]
  const sellPrice = randomInt(19, 299)
  return {
    id: `goods-${seed++}`,
    title,
    sellPrice,
    marketPrice: sellPrice + randomInt(10, 88),
    tag: TAG_POOL[randomInt(0, TAG_POOL.length - 1)],
    height: randomInt(160, 320),
  }
}

function createItems(count = PAGE_SIZE) {
  return Array.from({ length: count }, () => createItem())
}

// 精品推荐
const goodsRef = ref<GoodsItem[]>(createItems())
const isLoadingMore = ref(false)

function loadMore() {
  if (isLoadingMore.value) {
    return
  }

  isLoadingMore.value = true
  setTimeout(() => {
    goodsRef.value = [...goodsRef.value, ...createItems()]
    isLoadingMore.value = false
  }, 600)
}
</script>

<template>
  <view class="box-border flex flex-col fixed top-0 left-0 right-0 bottom-0">
    <scroll-view
      scroll-y
      lower-threshold="160"
      class="absolute top-0 left-0 right-0 bottom-0 p-[24rpx] box-border"
      @scrolltolower="loadMore"
    >
      <WaterfallFlow ref="waterfallFlowRef" :data-source="goodsRef" :add-time="50">
        <template #left="{ items }">
          <view class="flex flex-col gap-[24rpx]">
            <view v-for="item in items" :key="item.id" class="flex flex-col gap-[24rpx] relative box-border">
              <view class="border-rd-[12rpx] overflow-hidden bg-white dark:bg-[#0f172a] box-border shadow-sm" @click="removeItem(item.id)">
                <view
                  class="w-full bg-[#f4f6fb] dark:bg-[#1e293b] flex items-center justify-center text-[24rpx] text-label-tertiary"
                  :style="{ height: `${item.height}rpx` }"
                >
                  {{ item.height }}
                </view>

                <view class="p-[16rpx] box-border">
                  <view class="text-[26rpx] text-label-primary mb-[12rpx] line-clamp-2 font-semibold">
                    {{ item.title }}
                  </view>

                  <view class="inline-flex items-center px-[12rpx] py-[4rpx] bg-primary-50 text-primary border-rd-[999rpx] text-[20rpx] mb-[12rpx]">
                    {{ item.tag }}
                  </view>

                  <view class="flex items-baseline justify-between">
                    <view class="flex items-center gap-[8rpx]">
                      <text class="text-[28rpx] text-label-error font-bold">
                        ￥{{ item.sellPrice }}
                      </text>
                      <text class="text-[22rpx] text-label-secondary line-through">
                        ￥{{ item.marketPrice }}
                      </text>
                    </view>

                    <view class="flex items-end">
                      <text class="text-[18rpx] text-label-secondary">
                        已售 1024
                      </text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </template>

        <template #right="{ items }">
          <view class="flex flex-col gap-[24rpx]">
            <view v-for="item in items" :key="item.id" class="flex flex-col gap-[24rpx] relative box-border">
              <view class="border-rd-[12rpx] overflow-hidden bg-white dark:bg-[#0f172a] box-border shadow-sm" @click="removeItem(item.id)">
                <view
                  class="w-full bg-[#f4f6fb] dark:bg-[#1e293b] flex items-center justify-center text-[24rpx] text-label-tertiary"
                  :style="{ height: `${item.height}rpx` }"
                >
                  {{ item.height }}
                </view>

                <view class="p-[16rpx] box-border">
                  <view class="text-[26rpx] text-label-primary mb-[12rpx] line-clamp-2 font-semibold">
                    {{ item.title }}
                  </view>

                  <view class="inline-flex items-center px-[12rpx] py-[4rpx] bg-primary-50 text-primary border-rd-[999rpx] text-[20rpx] mb-[12rpx]">
                    {{ item.tag }}
                  </view>

                  <view class="flex items-baseline justify-between">
                    <view class="flex items-center gap-[8rpx]">
                      <text class="text-[28rpx] text-label-error font-bold">
                        ￥{{ item.sellPrice }}
                      </text>
                      <text class="text-[22rpx] text-label-secondary line-through">
                        ￥{{ item.marketPrice }}
                      </text>
                    </view>

                    <view class="flex items-end">
                      <text class="text-[18rpx] text-label-secondary">
                        已售 1024
                      </text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </template>
      </WaterfallFlow>

      <view v-if="isLoadingMore" class="text-center text-[24rpx] text-label-tertiary py-[24rpx]">
        正在加载更多...
      </view>
    </scroll-view>

    <!-- #ifdef H5 -->
    <FABack />
    <!-- #endif -->
  </view>
</template>
