import Uni from '@dcloudio/vite-plugin-uni'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(() => {

  const { UNI_PLATFORM } = process.env

  return {
    plugins: [
      UniManifest(),
      UniPages({
        dts: 'src/uni-pages.d.ts',
        subPackages: ['src/pages-sub'],
      }),
      Uni(),
    ],
    define: {
      __UNI_PLATFORM__: UNI_PLATFORM
    }
  }
})
