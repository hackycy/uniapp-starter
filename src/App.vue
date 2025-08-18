<script setup lang="ts">
import { onHide, onLaunch, onPageNotFound, onShow } from '@dcloudio/uni-app'
import { useThemeStore } from './store/modules/theme'

const themeStore = useThemeStore()

onLaunch(() => {
  console.log('App Launch')

  themeStore.setup()
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})

onPageNotFound(() => {
  uni.redirectTo({
    url: '/pages-sub/404',
  })
})
</script>

<style lang="scss"></style>
