import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import { buildFullPath } from '..'
import { isDev } from '../env'

export const REQUEST_BASE_URL = buildFullPath(import.meta.env.VITE_API_BASE_URL, import.meta.env.VITE_API_PATH)

const alovaInstance = createAlova({
  baseURL: REQUEST_BASE_URL,
  ...AdapterUniapp(),
  timeout: 10 * 1000,
  statesHook: VueHook,
  /**
   * https://alova.js.org/zh-CN/tutorial/cache/mode
   * 缓存模式，默认情况下，GET 请求有 300000ms(5 分钟)的内存缓存时间
   * 如果需要禁用缓存，可以在请求时设置 `cacheFor: null`
   */
  cacheFor: {
    GET: 1 * 60 * 1000, // 1 分钟
  },
  /**
   * https://alova.js.org/zh-CN/tutorial/advanced/in-depth/cache-logger
   * 是否启用缓存日志打印，仅在开发环境下开启
   */
  cacheLogger: isDev(),
})

export const http = alovaInstance
