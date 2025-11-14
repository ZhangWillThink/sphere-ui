import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vueDevTools from 'vite-plugin-vue-devtools'

// 读取 package.json，按 peerDependencies 自动 externalize
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const pkgPath = path.resolve(__dirname, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
const externalDeps = Object.keys(pkg.peerDependencies || {})

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss(), dts() as any],

  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'SphereUI',
      fileName: format => `sphere-ui.${format}.js`,
      formats: ['es', 'cjs'],
    },

    // 单独打包 CSS
    cssCodeSplit: false,

    // Rollup options
    rollupOptions: {
      external: [...externalDeps, 'vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        // 确保 CSS 文件名一致
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') {
            return 'sphere-ui.css'
          }
          return assetInfo.name || 'assets/[name]-[hash][extname]'
        },
        // 导出配置
        exports: 'named',
      },
    },
  },
  server: {
    port: 1024 * 5,
  },
})
