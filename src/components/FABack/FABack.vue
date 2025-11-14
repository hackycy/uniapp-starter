<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { PageEnum } from '@/enums/pageEnum'
import { useRouter } from '@/router'

const emits = defineEmits(['back'])
const router = useRouter()

const canGoBackRef = ref(false)

function handleClick() {
  emits('back')
  if (canGoBackRef.value) {
    router.back()
  }
  else {
    router.replace(PageEnum.BASE_HOME)
  }
}

onShow(() => {
  canGoBackRef.value = router.canGoBack()
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
  <wd-fab custom-class="fab-back" position="left-bottom" draggable :expandable="false" :gap="{ bottom: 100 }">
    <template #trigger>
      <view class="fab-back" @click="handleClick">
        <text v-if="canGoBackRef" class="icon i-ion-chevron-back" />
        <text v-else class="icon i-ion-home" />
      </view>
    </template>
  </wd-fab>
</template>

<style lang="scss" scoped>
.fab-back {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  border-radius: 50%;
  width: 68rpx;
  height: 68rpx;
  color: white;
  opacity: 0.95;
  box-shadow:
    0 12rpx 32rpx rgba(0, 0, 0, 0.25),
    0 4rpx 12rpx rgba(0, 0, 0, 0.15);

  &:active {
    opacity: 0.8;
  }

  .icon {
    font-size: 30rpx;
  }
}
</style>
