<script setup lang="ts">
import { onHide, onLaunch, onPageNotFound, onShow } from '@dcloudio/uni-app'
import { useRouter } from './router'
import { queueGuards } from './router/helper'
import { useThemeStore } from './store/modules/theme'
import { parseURL } from './utils/uri'

const themeStore = useThemeStore()
const router = useRouter()

function startup(options: App.LaunchShowOption | undefined) {
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
  let query: Recordable

  // #ifdef MP-WEIXIN
  query = {
    ...options?.query,
  }
  // #endif

  // #ifdef H5
  const { query: urlQuery } = parseURL(location.href)
  query = {
    ...urlQuery,
  }
  // #endif

  queueGuards(
    {
      url: options?.path ? `/${options.path}` : '/',
      query,
    },
    router,
  )
}

onLaunch(() => {
  console.log('App Launch')

  themeStore.setup()
})

onShow((options) => {
  console.log('App Show')

  startup(options)
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
