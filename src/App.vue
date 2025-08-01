<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
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
</script>

<style lang="scss"></style>
