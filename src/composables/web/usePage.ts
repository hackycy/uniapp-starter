import { onLoad } from '@dcloudio/uni-app'
import { isEmpty } from 'radashi'
import { pages } from 'virtual:uni-pages'
import { shallowRef } from 'vue'

export interface Route {
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
    const page: Recordable | undefined = getCurrentPage()
    if (!page) {
      console.warn('No current page found.')
      return {}
    }

    const route: Route = pages.find((p) => {
      return p.path === page.route
    })

    if (page.$page) {
      route.fullPath = page.$page.fullPath
    }

    return route
  }

  onLoad((options) => {
    if (!isEmpty(options)) {
      console.log('Page options:', options)
    }
  })

  return {
    route,
    getCurrentPage,
  }
}
