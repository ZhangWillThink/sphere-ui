import { exec } from 'node:child_process'
import path from 'node:path'
import { promisify } from 'node:util'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

const execAsync = promisify(exec)

// 插件：构建后生成类型定义文件
function dts() {
  return {
    name: 'vite-plugin-dts',
    async closeBundle() {
      console.log('\nGenerating TypeScript declaration files...')
      try {
        // 使用 vue-tsc 生成类型定义文件
        const { stdout, stderr } = await execAsync(
          'bunx vue-tsc -p tsconfig.build.json --declaration --emitDeclarationOnly',
          { cwd: process.cwd() },
        )
        if (stdout) console.log(stdout)
        if (stderr && !stderr.includes('DeprecationWarning')) console.error(stderr)
        console.log('✓ TypeScript declaration files generated successfully!\n')
      } catch (error: any) {
        console.error('Failed to generate declaration files:', error.message)
        // 不阻止构建过程
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss(), dts()],

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
      external: ['vue'],
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
