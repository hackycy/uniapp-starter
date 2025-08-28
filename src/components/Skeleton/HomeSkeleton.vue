<script setup lang="ts">
// 使用 wot-design-uni Skeleton 实现首页骨架屏
// 可通过 loading 控制显示隐藏
const props = defineProps({
  loading: { type: Boolean, default: true },
  /** 卡片数量 */
  cardCount: { type: Number, default: 4 },
  /** 分类数量 (4 的倍数, 两行) */
  categoryCount: { type: Number, default: 8 },
})

const firstRowCategories = () => Math.min(props.categoryCount / 2, 4)
</script>

<script lang="ts">
export default { options: { virtualHost: true, addGlobalClass: true, styleIsolation: 'shared' } }
</script>

<template>
  <view v-if="props.loading" class="home-skeleton">
    <!-- Banner -->
    <wd-skeleton :row-col="[{ height: '300rpx' }]" theme="image" animation="gradient" />
    <!-- Search bar -->
    <wd-skeleton class="mt-3 px-3" :row-col="[{ height: '70rpx', width: '100%' }]" theme="text" animation="gradient" />
    <!-- Categories grid (two rows) -->
    <view class="grid-wrapper">
      <view class="row">
        <wd-skeleton v-for="i in firstRowCategories()" :key="`cat-r1-${i}`" :row-col="[[{ width: '100rpx', height: '100rpx', type: 'circle' }], [{ width: '80rpx', height: '28rpx' }]]" animation="gradient" />
      </view>
      <view class="row">
        <wd-skeleton v-for="i in firstRowCategories()" :key="`cat-r2-${i}`" :row-col="[[{ width: '100rpx', height: '100rpx', type: 'circle' }], [{ width: '80rpx', height: '28rpx' }]]" animation="gradient" />
      </view>
    </view>
    <!-- Recommendation Cards -->
    <view class="card-list">
      <view v-for="i in props.cardCount" :key="`card-${i}`" class="card-item">
        <wd-skeleton :row-col="[{ height: '260rpx', radius: '16rpx' }]" theme="image" animation="gradient" />
        <wd-skeleton class="p-2" :row-col="[{ width: '60%', height: '32rpx' }, { width: '80%', height: '24rpx' }]" theme="text" animation="gradient" />
      </view>
    </view>
  </view>
  <slot v-else />
</template>

<style scoped lang="scss">
.home-skeleton {
  .grid-wrapper {
    padding: 32rpx 16rpx 0;
    .row {
      display: flex;
      justify-content: space-between;
    }
  }
  .card-list {
    padding: 0 24rpx 24rpx;
    .card-item {
      margin-top: 32rpx;
    }
  }
}
</style>
