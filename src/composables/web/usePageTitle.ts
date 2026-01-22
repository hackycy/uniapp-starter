// #ifdef H5
import { useTitle } from '@vueuse/core'
import { getCurrentPage } from '@/router/helper'
// #endif

/**
 * 设置页面标题，H5端用于返回页面时恢复之前的标题
 * 其余端等同于调用 `uni.setNavigationBarTitle`
 */
export function usePageTitle() {
  // #ifdef H5
  useTitle(null, {
    restoreOnUnmount: (originalTitle: string, _currentTitle: string) => {
      const returnPage = getCurrentPage() as Recordable | undefined
      if (returnPage) {
        return returnPage.$page?.meta?.navigationBar?.titleText || originalTitle
      }
      return originalTitle
    },
  })
  // #endif

  function setTitle(title: string) {
    // #ifdef H5
    // pageTitle.value = title
    document.title = title
    // #endif

    // #ifndef H5
    uni.setNavigationBarTitle({
      title,
    })
    // #endif
  }

  return setTitle
}
