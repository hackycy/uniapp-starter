import { ref } from 'vue'
// #ifdef H5
import jweixin from 'wechat-open-js-sdk'
import { isWeixin } from '@/utils/browser'
// #endif
import { http } from '@/utils/http/alova'
import { useCallbacks } from './useCallbacks'

type OnReadyCallback = [() => void, (reason?: any) => void]

export interface Sign {
  appId: string
  timestamp: number
  nonceStr: string
  signature: string
}

export interface UseJWeixinOptions {
  debug?: boolean
  sign?: (url: string) => Promise<Sign>
}

async function defaultSign(url: string) {
  return http.Request<Sign>({
    method: 'POST',
    url: 'xxx',
    data: {
      url,
    },
  })
}

const readyRef = ref(false)
const readyHandlers = useCallbacks<OnReadyCallback>()

/**
 * JS-SDK 微信网页开发 SDK 封装
 * 更多微信网页开发sdk方法, 详见: https://developers.weixin.qq.com/doc/service/guide/h5/
 */
export function useJWeixin({ debug, sign = defaultSign }: UseJWeixinOptions = {}) {
  // #ifdef H5
  async function init() {
    try {
      if (!isWeixin()) {
        throw new Error('not in weixin browser')
      }

      const url = window.location.href.split('#')[0]
      const signData: Sign = await sign!(url)

      jweixin.ready(() => {
        markAsReady()
      })

      jweixin.error((err) => {
        markAsReady(new Error(`JWeixin SDK init fail: ${err?.errMsg}`))
      })

      jweixin.config({
        debug,
        appId: signData.appId,
        timestamp: signData.timestamp,
        nonceStr: signData.nonceStr,
        signature: signData.signature,
        jsApiList: ['openLocation'],
      })
    }
    catch (err: unknown) {
      markAsReady(new Error(`JWeixin SDK init fail: ${err}`))
    }
  }

  function isReady() {
    if (readyRef.value) {
      return Promise.resolve()
    }

    return new Promise<void>((resolve, reject) => {
      readyHandlers.add([resolve, reject])

      // 只有第一个请求会初始化
      if (readyHandlers.list().length <= 1) {
        init()
      }
    })
  }

  function markAsReady(err?: unknown) {
    if (!readyRef.value) {
      readyRef.value = !err
      readyHandlers.list().forEach(([resolve, reject]) => (err ? reject(err) : resolve()))
      readyHandlers.reset()
    }

    return err
  }

  async function getJWeixin(): Promise<typeof jweixin> {
    return isReady().then(() => jweixin)
  }

  return {
    isReady,
    getJWeixin,
  }
  // #endif
}
