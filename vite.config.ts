import process from 'node:process'
import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  /**
   * @see https://unocss.dev/
   * @see https://github.com/dcloudio/uni-app/issues/4815
   */
  const UnoCSS = (await import('unocss/vite')).default

  const { UNI_PLATFORM } = process.env
  console.log('UNI_PLATFORM -> ', UNI_PLATFORM)

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
  }
})
