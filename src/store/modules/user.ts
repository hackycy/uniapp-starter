import { defineStore } from 'pinia'
import { store } from '..'

export const useUserStore = defineStore('user', {})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
