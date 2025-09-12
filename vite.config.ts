import type { ConfigEnv, ProxyOptions, UserConfig } from 'vite'
import { readFile } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
// import Uni from '@dcloudio/vite-plugin-uni'
// ESM re-export @dcloudio/vite-plugin-uni
import Uni from '@uni-helper/plugin-uni'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import dayjs from 'dayjs'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import { loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { version } from './package.json'

// https://vitejs.dev/config/
export default async ({ mode }: ConfigEnv): Promise<UserConfig> => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_PORT, VITE_APP_NAME, VITE_APP_PROXY } = env
  const { UNI_PLATFORM } = process.env

  // /**
  //  * @see https://unocss.dev/
  //  * @see https://github.com/dcloudio/uni-app/issues/4815
  //  */
  // const UnoCSS = (await import('unocss/vite')).default

  return {
    plugins: [
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniPages({
        exclude: ['**/components/**/**.*', '**/*.ignore.*'],
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
      UNI_PLATFORM === 'h5'
      && createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: VITE_APP_NAME,
          },
        },
      }),
      // https://github.com/btd/rollup-plugin-visualizer
      UNI_PLATFORM === 'h5'
      && mode === 'production'
      && visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
      /**
       * 微信JS接口安全域名验证文件支持, 用于本地开发内网穿透调试使用
       */
      UNI_PLATFORM === 'h5'
      && mode === 'development' && {
        name: 'mp-verify-file-serve-plugin',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.originalUrl?.startsWith('/MP_') && req.originalUrl.endsWith('.txt')) {
              // 放置到 /node_modules/MP_verify_XXXXXX.txt 或 自行更改
              const filePath = path.join(process.cwd(), 'node_modules', req.originalUrl)
              readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                  res.statusCode = 500
                  res.end('Internal Server Error')
                }
                else {
                  res.setHeader('Content-Type', 'text/plain')
                  res.end(data)
                }
              })
            }
            else {
              next()
            }
          })
        },
      },
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
