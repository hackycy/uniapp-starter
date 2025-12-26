import type { App, ObjectPlugin } from 'vue'
import type { OnReadyCallback, Route, Router } from './types'
import { isEmpty } from 'radashi'
import { shallowReactive, shallowRef } from 'vue'
import { pages, subPackages } from '~uni-pages'
import { useCallbacks } from '@/composables/web/useCallbacks'
import { parseURL } from '@/utils/uri'
import { setupRouterGuard } from './guard'
import { getCurrentPageRoute, invokeGuards, navigateTo, routeKey, routerKey, START_LOCATION_NORMALIZED } from './helper'

export * from './core'

function createRouter(): Router & ObjectPlugin {
  const reactiveRoute = {} as Route
  const currentRoute = shallowRef<Route>(START_LOCATION_NORMALIZED)

  for (const key in START_LOCATION_NORMALIZED) {
    Object.defineProperty(reactiveRoute, key, {
      get: () => currentRoute.value[key as keyof Route],
      enumerable: true,
    })
  }

  const readyHandlers = useCallbacks<OnReadyCallback>()
  let ready: boolean = false

  /**
   * https://github.com/vuejs/router/blob/f420992ec453a09b22449617be9e30307d52acdf/packages/router/src/router.ts#L943
   */
  function markAsReady(err?: unknown): unknown {
    if (!ready) {
      // still not ready if an error happened
      ready = !err
      readyHandlers.list().forEach(([resolve, reject]) => (err ? reject(err) : resolve()))
      readyHandlers.reset()
    }

    return err
  }

  function triggerError(error: unknown): Promise<void> {
    markAsReady(error)
    return Promise.reject(error)
  }

  const router: ObjectPlugin & Router & { _pageShown?: boolean } = {
    guards: [],
    // Indicates whether the page has been shown at least once
    _pageShown: false,
    async push(to) {
      return navigateTo(to, this, 'push')
        .then(() => {
          markAsReady()
        })
        .catch((error) => {
          return triggerError(error)
        })
    },
    async replace(to) {
      return navigateTo(to, this, 'replace')
        .then(() => {
          markAsReady()
        })
        .catch((error) => {
          return triggerError(error)
        })
    },
    async switchTab(to) {
      return navigateTo(to, this, 'switchTab')
        .then(() => {
          markAsReady()
        })
        .catch((error) => {
          return triggerError(error)
        })
    },
    async reLaunch(to) {
      return navigateTo(to, this, 'reLaunch')
        .then(() => {
          markAsReady()
        })
        .catch((error) => {
          return triggerError(error)
        })
    },
    back(to) {
      return uni.navigateBack(to)
    },
    canGoBack(delta?: number) {
      delta = delta ?? 1
      return getCurrentPages().length > delta
    },
    isReady: () => {
      if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        readyHandlers.add([resolve, reject])
      })
    },
    install(app) {
      app.provide(routerKey, this)
      app.provide(routeKey, shallowReactive(reactiveRoute))

      app.mixin({
        beforeCreate() {
          if (this.$mpType === 'page') {
            currentRoute.value = getCurrentPageRoute(router)
          }
        },
        onLoad(option) {
          if (!isEmpty(option)) {
            currentRoute.value = {
              ...currentRoute.value,
              query: router._pageShown ? option : { ...currentRoute.value.query, ...option },
            }
          }
        },
        onShow(options?: Recordable) {
          if (this.$mpType === 'page') {
            if (!router._pageShown) {
              router._pageShown = true
            }

            const route = getCurrentPageRoute(router)
            if (route.path !== currentRoute.value.path) {
              currentRoute.value = route
            }
          }
          else if (this.$mpType === 'app' && options && !ready) {
            let mergedQuery: Recordable = options.query || {}
            // #ifdef H5
            const { query: urlQuery } = parseURL(location.href)
            mergedQuery = { ...urlQuery, ...mergedQuery }
            // #endif

            currentRoute.value.path = options.path
            currentRoute.value.query = mergedQuery

            // 首次进入手动触发拦截器，用于处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
            invokeGuards(
              {
                url: `/${currentRoute.value.path}`,
                query: currentRoute.value.query,
              },
              router,
            )
              .then(markAsReady)
              .catch(markAsReady)
          }
        },
      })
    },
    route: currentRoute,
    routes: [
      ...pages,
      ...subPackages.reduce((arr, cur) => {
        return arr.concat(cur.pages.map(e => ({ ...e, path: `${cur.root}/${e.path}` })))
      }, [] as Recordable[]),
    ],
  }

  return router
}

export const router = createRouter()

export function setupRouter(app: App<Element>) {
  setupRouterGuard(router)
  app.use(router)
}
