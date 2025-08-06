import process from 'node:process'
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import { loadEnv } from 'vite'
import { version } from './package.json'

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const { VITE_APP_NAME, VITE_APP_ID, VITE_APP_DESCRIPTION, VITE_WX_APPID, VITE_APP_PUBLIC_BASE } = env

export default defineManifestConfig({
  'name': VITE_APP_NAME,
  'appid': VITE_APP_ID,
  'description': VITE_APP_DESCRIPTION,
  'versionName': version,
  'versionCode': `${Number(version.replace(/\./g, ''))}`,
  'transformPx': false,
  /* 5+App特有相关 */
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    /* 模块配置 */
    modules: {},
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
        ],
      },
      /* ios打包配置 */
      ios: {},
      /* SDK配置 */
      sdkConfigs: {},
      /* 图标配置 */
      icons: {
        android: {},
        ios: {},
      },
    },
  },
  /* 快应用特有相关 */
  'quickapp': {},
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: VITE_WX_APPID,
    __usePrivacyCheck__: true,
    setting: {
      urlCheck: false,
      // 是否启用 ES6 转 ES5
      es6: true,
      minified: true,
    },
    optimization: {
      subPackages: true,
    },
    usingComponents: true,
    // https://uniapp.dcloud.net.cn/tutorial/darkmode.html
    darkmode: true,
    themeLocation: 'theme.json',
  },
  'mp-alipay': {
    usingComponents: true,
    styleIsolation: 'shared',
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  'uniStatistics': {
    enable: false,
  },
  'h5': {
    router: {
      base: VITE_APP_PUBLIC_BASE,
      mode: 'hash',
    },
    // https://uniapp.dcloud.net.cn/tutorial/darkmode.html
    darkmode: true,
    themeLocation: 'theme.json',
  },
  'vueVersion': '3',
})
