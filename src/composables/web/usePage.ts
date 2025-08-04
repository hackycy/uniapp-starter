import { onLoad } from '@dcloudio/uni-app'
import { isEmpty } from 'radashi'
import { pages } from 'virtual:uni-pages'
import { computed, shallowRef } from 'vue'

export interface Route {
  fullPath?: string
  aliasPath?: string
  name?: string
  path?: string
  query?: Record<string, any>
}

export function usePage() {
  const currRoute = shallowRef<Route>(getCurrentPageRoute())

  const getRoute = computed(() => {
    return currRoute.value
  })

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

  onLoad((option) => {
    if (!isEmpty(option)) {
      currRoute.value = {
        ...currRoute.value,
        query: option,
      }
    }
  })

  return {
    route: getRoute,
    getCurrentPage,
  }
}
