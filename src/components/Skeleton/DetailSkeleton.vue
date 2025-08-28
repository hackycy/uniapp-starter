<script setup lang="ts">
const props = defineProps({
  loading: { type: Boolean, default: true },
  /** 段落行数 */
  paragraph: { type: Number, default: 8 },
})
</script>

<script lang="ts">
export default { options: { virtualHost: true, addGlobalClass: true, styleIsolation: 'shared' } }
</script>

<template>
  <view v-if="props.loading" class="detail-skeleton">
    <wd-skeleton :row-col="[{ height: '450rpx' }]" theme="image" animation="gradient" />
    <wd-skeleton
      class="px-3 py-3"
      :row-col="[
        { width: '70%', height: '46rpx' },
        { width: '40%', height: '32rpx' },
        ...Array.from({ length: 3 }).map(() => ({ width: '100%', height: '28rpx' })),
        { width: '90%', height: '28rpx' },
        { width: '60%', height: '28rpx' },
        ...Array.from({ length: props.paragraph }).map(() => ({ width: '100%', height: '26rpx' })),
        { width: '80%', height: '26rpx' },
        { width: '65%', height: '26rpx' },
      ]"
      theme="text"
      animation="gradient"
    />
  </view>
  <slot v-else />
</template>

<style scoped lang="scss">
</style>
