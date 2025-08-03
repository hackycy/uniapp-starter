import { onLoad } from '@dcloudio/uni-app'
import { isEmpty } from 'radashi'
import { shallowRef } from 'vue'

interface Route {
  fullPath?: string
  aliasPath?: string
  name?: string
  path?: string
  query?: Record<string, any>
  params?: Record<string, any>
  [key: string]: any
}

export function usePages() {
  const route = shallowRef<Route>(getCurrentPageRoute()!)

  function getCurrentPage() {
    const pages = getCurrentPages()
    return pages.length > 0 ? pages[pages.length - 1] : undefined
  }

  function getCurrentPageRoute() {
    const page = getCurrentPage()
    if (!page) {
      return
    }

    const path = `/${page.route}`.split('?')[0]

    return {
      path,
    }
  }

  onLoad((options) => {
    if (!isEmpty(options)) {
      route.value = {
        ...options,
      }
    }
  })

  return {
    route,
    getCurrentPage,
  }
}
