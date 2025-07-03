import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import UniHelperManifest from "@uni-helper/vite-plugin-uni-manifest";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UniHelperManifest(), uni()],
});
