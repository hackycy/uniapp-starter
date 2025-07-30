import type { ConfigEnv, UserConfig } from 'vite'
import path from 'node:path'
import process from 'node:process'
import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import dayjs from 'dayjs'
import { loadEnv } from 'vite'
import { version } from './package.json'

// https://vitejs.dev/config/
export default async ({ mode }: ConfigEnv): Promise<UserConfig> => {
  /**
   * @see https://unocss.dev/
   * @see https://github.com/dcloudio/uni-app/issues/4815
   */
  const UnoCSS = (await import('unocss/vite')).default

  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_PORT } = env
  const { UNI_PLATFORM } = process.env

  return {
    plugins: [
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniPages({
        dir: 'src/pages',
        subPackages: ['src/pages-sub'],
        dts: 'types/uni-pages.d.ts',
        mergePages: true,
      }),
      Uni(),
      // https://github.com/antfu/unocss
      UnoCSS(),
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
    },
    build: {
      sourcemap: false,
      target: 'es6',
      minify: mode === 'development' ? false : 'esbuild',
    },
  }
}
