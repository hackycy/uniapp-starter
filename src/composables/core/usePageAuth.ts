import { useUserStoreWithOut } from '@/store/modules/user'

export function usePageAuth() {
  const userStore = useUserStoreWithOut()

  console.log('usePageAuth', userStore)
}
