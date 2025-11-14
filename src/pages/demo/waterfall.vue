<script setup lang="ts">
import { ref } from 'vue'
import FABack from '@/components/FABack/FABack.vue'
import WaterfallComp from '@/components/Waterfall/Waterfall.vue'

interface GoodsItem {
  id: string
  image: string
  title: string
  marketPrice: number
  sellPrice: number
  tag: string
}

// 精品推荐
const goodsRef = ref<GoodsItem[]>([
  {
    id: 'goods-1',
    image: 'https://img.alicdn.com/imgextra/i4/2210681560277/O1CN01du28AW1DuunTuNYw5_!!2210681560277.jpg_q50.jpg_.webp',
    title: '烟台伴手礼海鲜零食组合手提袋尽享海鲜零食美味大礼包',
    marketPrice: 68,
    sellPrice: 58,
    tag: '特产',
  },
  {
    id: 'goods-2',
    image: 'https://img.alicdn.com/imgextra/i3/1079518540/O1CN01xHA7KR2CxNUu1Z8Ni~hdr~_!!1079518540.heic_q50.jpg_.webp',
    title: '烟台文创｜养马岛相机冰箱贴 獐岛 秦风崖 海岛日记 果冻海',
    marketPrice: 128,
    sellPrice: 99,
    tag: '纪念品',
  },
  {
    id: 'goods-3',
    image: 'https://gw.alicdn.com/imgextra/O1CN01ZH5Pjv20nVZBhLfC0_!!6000000006894-0-mia.jpg_q50.jpg_.webp',
    title: '山东烟台红富士苹果脆甜多汁冰糖心丑苹果当季新鲜水果整箱装包邮',
    marketPrice: 128,
    sellPrice: 99,
    tag: '特产',
  },
  {
    id: 'goods-4',
    image: 'https://img.alicdn.com/imgextra/i2/2276447069/TB25goVX_nI8KJjSszgXXc8ApXa_!!2276447069.jpg',
    title: '烟台蓬莱长岛旅游特产淡干金钩海米即食小虾米虾仁新货海鲜海产',
    marketPrice: 58,
    sellPrice: 39,
    tag: '海鲜',
  },
  {
    id: 'goods-5',
    image:
      'https://img.alicdn.com/imgextra/i3/2217552268461/O1CN01oRWmow2CNC9RgGBaW_!!4611686018427382957-0-item_pic.jpg_q50.jpg_.webp',
    title: '可折叠露营车摆摊地摊小推车拉货专用取快递手推车营地户外野餐车',
    marketPrice: 198,
    sellPrice: 159,
    tag: '户外',
  },
])
</script>

<template>
  <view class="box-border flex flex-col fixed top-0 left-0 right-0 bottom-0">
    <scroll-view scroll-y class="absolute top-0 left-0 right-0 bottom-0 p-[24rpx] box-border">
      <WaterfallComp :model-value="goodsRef" :columns="2">
        <template v-for="colIndex in [0, 1]" :key="colIndex" #[`waterfall-column-${colIndex}`]="{ items }">
          <view v-for="item in items" :key="item.id" class="flex flex-col gap-[24rpx] relative box-border">
            <view class="border-rd-[12rpx] overflow-hidden bg-white box-border shadow-sm">
              <image class="w-full" style="min-height: 80rpx" :src="item.image" mode="widthFix" />

              <view class="p-[16rpx] box-border">
                <view class="text-[26rpx] text-label-primary mb-[12rpx] line-clamp-2 font-semibold">
                  {{ item.title }}
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
        </template>
      </WaterfallComp>
    </scroll-view>

    <!-- #ifdef H5 -->
    <FABack />
    <!-- #endif -->
  </view>
</template>
