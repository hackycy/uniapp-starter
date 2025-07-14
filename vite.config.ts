import path from 'node:path'
import process from 'node:process'
import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import dayjs from 'dayjs'
import { defineConfig } from 'vite'
import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  /**
   * @see https://unocss.dev/
   * @see https://github.com/dcloudio/uni-app/issues/4815
   */
  const UnoCSS = (await import('unocss/vite')).default

  const { UNI_PLATFORM } = process.env

  return {
    plugins: [
      UniManifest(),
      UniPages({
        dts: 'src/uni-pages.d.ts',
        subPackages: ['src/pages-sub'],
      }),
      Uni(),
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
      },
    },
  }
})
