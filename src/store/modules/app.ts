import { defineStore } from 'pinia'
import { store } from '..'

export const useAppStore = defineStore('app', {})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
