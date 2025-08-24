import type { UserState } from '../types'
import { defineStore } from 'pinia'
import { store } from '..'

export const useUserStore = defineStore('user', {
  state(): UserState {
    return {
      token: undefined,
      profile: undefined,
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
