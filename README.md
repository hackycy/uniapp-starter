# uniapp-starter

基于 Vite + Vue3 + TypeScript + uni-app 的多端快速启动模板

支持 公众号H5 / 微信小程序 / 多家小程序 等平台一套代码多端输出。

预览地址: [http://gh.sooosin.com/uniapp-starter](http://gh.sooosin.com/uniapp-starter/)

## ✨ 特性 (Features)

- 🔧 基于 Vite 构建，按需插件组合，启动 & 构建快速
- 📦 高度工程化，自动生成 pages / layouts / manifest，约定式页面 & 布局
- 🎨 UnoCSS 原子化 + 自定义 Icon 集成（`src/assets/icons`）
- 🧩 主题系统：预设多主题色，可运行时切换（Pinia 持久化）
- 🧭 自封装 Router（轻量仿 Vue Router API + 守卫体系 + 登录拦截）
- 🔐 简易缓存封装：统一前缀、同步/异步、可扩展加密、过期策略
- 🌐 基于 `alova` + `@alova/adapter-uniapp` 的请求层封装
- 🐛 开发辅助：H5 下自动/动态加载 vConsole；微信小程序开启调试
- 📱 安全区工具类 + 常用组合式函数（轮询、进度模拟、节流渲染、脚本动态注入等）
- 🧪 TypeScript 全量类型支持 & ESM 纯净输出
- 🧹 统一 ESLint + Prettier + Antfu 代码风格
- 🚀 支持 H5 SSR（`dev:h5:ssr` / `build:h5:ssr`）
- 🏷 自定义标签、导航栏、隐私弹窗等基础组件示例

## 🗂 目录结构 (Overview)

```
├─ src
│  ├─ pages/            业务主包页面（自动扫描）
│  ├─ pages-sub/        分包页面（自动扫描）
│  ├─ layouts/          约定式布局（默认 default / navigation）
│  ├─ components/       公共组件（TabBar / PrivacyPopup / Skeleton ...）
│  ├─ composables/      组合式工具（web、core、component）
│  ├─ store/            Pinia 模块化状态管理
│  ├─ router/           自定义轻量路由实现 + 守卫
│  ├─ utils/            通用工具（env/cache/http/uuid/uri/...）
│  ├─ settings/         主题/TabBar 等项目设定
│  ├─ styles/           全局样式 & 入口 SCSS
│  ├─ assets/           图标 & 图片资源（自定义 svg 会被 UnoCSS Icons 集合加载）
│  ├─ App.vue
│  └─ main.ts           应用入口（SSR createApp）
├─ uno.config.ts        UnoCSS 配置（icons + rules + shortcuts + theme）
├─ vite.config.ts       Vite & uni-helper 插件集成
├─ manifest.config.ts   manifest 生成配置（自动）
├─ pages.config.ts      pages 生成配置（自动）
└─ eslint.config.mjs    ESLint 配置
```

## 🚀 快速开始 (Getting Started)

1. 环境要求：Node >= 18，推荐使用 `pnpm`
2. 克隆项目：
```bash
npx degit hackycy/uniapp-starter my-app
cd my-app
pnpm i
```

## 🧩 路由说明

项目未直接使用官方路由跳转，而是在 `src/router` 内实现轻量封装：

- `router.push / replace / switchTab / reLaunch / back` API 与 Vue Router 类似
- `router.route` 为当前路由（响应式）
- 守卫：在 `guard.ts` 中注册，支持登录拦截（`meta.auth = true`）
- 页面元信息来源：`pages.config.ts` + `pages.json` 自动生成产物（由 `@uni-aide/vite-plugin-pages` 插件提供）

示例跳转：

```ts
import { router } from '@/router'

router.push({ path: '/pages/index/index', query: { from: 'home' } })
```

## 🎨 主题 & 颜色

`useThemeStore`：

- `theme`: 'light' | 'dark' | 'system'
- `themeColor` 动态主色（绑定到 UnoCSS theme 变量 / wot-design 主题）
- 预设色在 `src/settings/designSetings.ts`

切换示例：

```ts
const theme = useThemeStore()
theme.setThemeColor('#FF7D00')
theme.setTheme('dark')
```

## 🌐 网络请求 (alova)

文件：`src/utils/http/alova.ts`

```ts
import { http } from '@/utils/http/alova'

const getUser = http.Get('/user/info')
const { loading, data, error } = useRequest(getUser)
```

支持：全局 baseURL = VITE_API_BASE_URL + VITE_API_PATH；可拓展拦截器（自行在创建实例时添加）。

## 💾 缓存封装

文件：`src/utils/cache/storage.ts`

特性：

- 统一前缀 (VITE_APP_SHORT_NAME)
- 同步 & 异步 API
- 过期时间（秒）
- 可选加解密（留扩展点）

示例：

```ts
import { storage } from '@/utils/cache'

storage.set('TOKEN', 'xxx', 3600)
const token = storage.get('TOKEN')
```

## 🔌 自定义图标

在 `src/assets/icons` 中放置处理好的 SVG（去除宽高、颜色使用 currentColor），可直接通过 `i-custom-文件名` 类名使用。

## ❓ FAQ

1. H5 下 vConsole 不生效？
   - 确认 `.env` 中 `VITE_DEVTOOL=true` 且为开发模式。
2. 页面无路由元信息？
   - 检查 `pages.config.ts` 或确保未被 `exclude` 规则过滤。
3. 图标不显示？
   - 确认 SVG 是否合法（无 xml header，使用 `currentColor`）。

## 🤝 贡献 (Contributing)

欢迎 Issue / PR，建议保持：小步提交 + 清晰描述 + 类型安全。

## 📝 License

MIT © 2024-present hackycy

## 🙏 致谢 (Thanks)

- [unibest](https://github.com/unibest-tech/unibest)
- [uni-helper](https://github.com/uni-helper/vitesse-uni-app)
- [wot](https://github.com/Moonofweisheng/wot-demo)
