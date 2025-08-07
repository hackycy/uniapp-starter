import type { Router } from './types'

const NAVIGATE_METHODS = ['navigateTo', 'redirectTo', 'switchTab']

export function setupRouterGuard(_router: Router) {
  NAVIGATE_METHODS.forEach((method) => {
    uni.addInterceptor(method, {
      invoke(_args: UniApp.NavigateToOptions) {
        return true
      },
    })
  })
}
