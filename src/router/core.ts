import type { ShallowReactive } from 'vue'
import type { Route } from './types'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { inject } from 'vue'
import { routeKey, routerKey } from './helper'

export function useRoute(): ShallowReactive<Route> {
  const currentRoute = inject(routeKey)
  if (currentRoute) {
    return currentRoute
  }
  else {
    throw new Error('useRoute: No route provided. it is being used inside a Vue component.')
  }
}

export function useRouter() {
  const router = inject(routerKey)
  if (router) {
    return router
  }
  else {
    throw new Error('useRouter: No router provided. it is being used inside a Vue component.')
  }
}

export function onRouteShow(fn: Fn) {
  // 放在事件循环的末尾执行，确保路由状态已经更新
  onShow(() => {
    Promise.resolve().then(() => {
      fn()
    })
  })
}

export function onRouteLoad(fn: AnyFn) {
  // 放在事件循环的末尾执行，确保路由状态已经更新
  onLoad((options) => {
    Promise.resolve().then(() => {
      fn(options)
    })
  })
}
