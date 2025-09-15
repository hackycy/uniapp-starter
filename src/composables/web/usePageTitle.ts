// #ifdef H5
import { useTitle } from '@vueuse/core'
// #endif

export function usePageTitle() {
  // #ifdef H5
  const pageTitle = useTitle(null, {
    restoreOnUnmount: (oldTitle) => {
      return oldTitle
    },
  })
  // #endif

  function setTitle(title: string) {
    // #ifdef H5
    pageTitle.value = title
    // #endif
  }

  return setTitle
}
