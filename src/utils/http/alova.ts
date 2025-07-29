import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import { buildFullPath } from '..'

const alovaInstance = createAlova({
  baseURL: buildFullPath(import.meta.env.VITE_API_BASE_URL, import.meta.env.VITE_API_PATH),
  ...AdapterUniapp(),
  timeout: 10 * 1000,
  statesHook: VueHook,
})

export const http = alovaInstance
