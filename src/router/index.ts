import type { App, ObjectPlugin } from 'vue'
import type { Route, Router } from './types'
import { isEmpty } from 'radashi'
import { pages } from 'virtual:uni-pages'
import { shallowReactive, shallowRef } from 'vue'
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

  const router: ObjectPlugin & Router = {
    guards: [],
    push(to) {
      return navigateTo(to, this, 'push')
    },
    replace(to) {
      return navigateTo(to, this, 'replace')
    },
    switchTab(to) {
      return navigateTo(to, this, 'switchTab')
    },
    reLaunch(to) {
      return navigateTo(to, this, 'reLaunch')
    },
    back(to) {
      return uni.navigateBack(to)
    },
    isReady: () => {
      // TODO
      return Promise.resolve(true)
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
              query: option,
            }
          }
        },
        onShow(options?: Recordable) {
          if (this.$mpType === 'app' && options) {
            let mergedQuery: Recordable = options.query || {}
            // #ifdef H5
            const { query: urlQuery } = parseURL(location.href)
            mergedQuery = { ...urlQuery, ...mergedQuery }
            // #endif

            currentRoute.value.path = `/${options?.path}`
            currentRoute.value.query = mergedQuery

            // 首次进入手动触发拦截器，用于处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
            invokeGuards(
              {
                url: currentRoute.value.path,
                query: currentRoute.value.query,
              },
              router,
            )
          }
          else if (this.$mpType === 'page') {
            currentRoute.value = getCurrentPageRoute(router)
          }
        },
      })
    },
    route: currentRoute,
    routes: pages,
  }

  return router
}

export const router = createRouter()

export function setupRouter(app: App<Element>) {
  setupRouterGuard(router)
  app.use(router)
}
