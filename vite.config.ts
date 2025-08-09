import type { ConfigEnv, ProxyOptions, UserConfig } from 'vite'
import path from 'node:path'
import process from 'node:process'
import Uni from '@dcloudio/vite-plugin-uni'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import dayjs from 'dayjs'
import { loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { version } from './package.json'

// https://vitejs.dev/config/
export default async ({ mode }: ConfigEnv): Promise<UserConfig> => {
  /**
   * @see https://unocss.dev/
   * @see https://github.com/dcloudio/uni-app/issues/4815
   */
  const UnoCSS = (await import('unocss/vite')).default

  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_PORT, VITE_APP_NAME, VITE_APP_PROXY } = env
  const { UNI_PLATFORM } = process.env

  return {
    plugins: [
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniPages({
        exclude: ['**/components/**/**.*'],
        dir: 'src/pages',
        subPackages: ['src/pages-sub'],
        dts: 'types/uni-pages.d.ts',
        mergePages: true,
      }),
      // https://github.com/uni-helper/vite-plugin-uni-layouts
      UniLayouts({
        layout: 'default',
        layoutDir: 'src/layouts',
      }),
      Uni(),
      // https://github.com/antfu/unocss
      UnoCSS(),
      // https://github.com/vbenjs/vite-plugin-html
      UNI_PLATFORM === 'h5' && createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: VITE_APP_NAME,
          },
        },
      }),
    ],
    define: {
      __APP_INFO__: JSON.stringify({
        platform: UNI_PLATFORM,
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        version,
      }),
    },
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
        '#': path.join(process.cwd(), './types'),
      },
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT!),
      proxy: createProxy(VITE_APP_PROXY),
    },
    build: {
      sourcemap: false,
      target: 'es6',
      minify: mode === 'development' ? false : 'esbuild',
    },
  }
}

/**
 * Generate proxy
 */
function createProxy(proxtEnv: string) {
  const ret: Record<string, ProxyOptions> = {}

  // vite proxy
  let proxy: [string, string][] = []
  try {
    proxy = JSON.parse(proxtEnv)
  }
  catch {
    // ignore
  }

  for (const [prefix, target] of proxy) {
    const isHttps = target.startsWith('https://')

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    }
  }

  return ret
}
