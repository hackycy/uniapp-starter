import Uni from '@dcloudio/vite-plugin-uni'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import { defineConfig } from 'vite'
import { ensureManifestFile } from './build/utils'

ensureManifestFile()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UniManifest(),
    UniPages({
      dts: 'src/uni-pages.d.ts',
    }),
    Uni(),
  ],
})
