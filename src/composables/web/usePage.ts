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

export function usePage() {
  const route = shallowRef<Route>(getCurrentPageRoute())

  function getCurrentPage() {
    const pages = getCurrentPages()
    return pages.length > 0 ? pages[pages.length - 1] : undefined
  }

  function getCurrentPageRoute(): Route {
    const route: Route = {}
    const page = getCurrentPage()
    if (page) {
      try {
        const parsed = new URL(`/$${page.route}`)
        route.path = parsed.pathname
      }
      catch {
      // ?
      }
    }

    return route
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
