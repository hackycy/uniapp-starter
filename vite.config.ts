import path from 'node:path'
import process from 'node:process'
import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import dayjs from 'dayjs'
import { defineConfig } from 'vite'
import { version } from './package.json'

// https://vitejs.dev/config/
export default async ({ mode }) => {
  /**
   * @see https://unocss.dev/
   * @see https://github.com/dcloudio/uni-app/issues/4815
   */
  const UnoCSS = (await import('unocss/vite')).default
  const ViteRestart = (await import('vite-plugin-restart')).default

  const { UNI_PLATFORM, UNI_APP_PORT } = process.env

  return defineConfig({
    envPrefix: 'UNI_',
    plugins: [
      UniManifest(),
      UniPages({
        dir: 'src/pages',
        subPackages: ['src/pages-sub'],
        dts: 'types/uni-pages.d.ts',
        mergePages: true,
      }),
      Uni(),
      UnoCSS(),
      ViteRestart({
        restart: ['vite.config.ts'],
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
      port: Number.parseInt(UNI_APP_PORT!),
    },
    build: {
      sourcemap: false,
      target: 'es6',
      minify: mode === 'development' ? false : 'esbuild',
    },
  })
}
