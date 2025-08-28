<script setup lang="ts">
// 列表页骨架屏 - 使用 wot-design-uni Skeleton
const props = defineProps({
  loading: { type: Boolean, default: true },
  rows: { type: Number, default: 8 },
  /** 左侧缩略图大小 */
  thumbSize: { type: String, default: '100rpx' },
})
</script>

<script lang="ts">
export default { options: { virtualHost: true, addGlobalClass: true, styleIsolation: 'shared' } }
</script>

<template>
  <view v-if="props.loading" class="list-skeleton">
    <view v-for="i in props.rows" :key="i" class="row-item">
      <wd-skeleton :row-col="[{ size: props.thumbSize, type: 'rect', radius: '12rpx' }]" animation="gradient" />
      <wd-skeleton
        class="flex-1 ml-3"
        :row-col="[{ width: '70%', height: '32rpx' }, { width: '55%', height: '26rpx' }, { width: '40%', height: '24rpx' }]"
        animation="gradient"
        theme="text"
      />
    </view>
  </view>
  <slot v-else />
</template>

<style scoped lang="scss">
.list-skeleton {
  padding: 24rpx;
  .row-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 40rpx;
  }
}
</style>
