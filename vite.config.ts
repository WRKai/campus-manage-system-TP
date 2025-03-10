import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'
import viteCompress from 'vite-plugin-compression'
import vueDevTools from 'vite-plugin-vue-devtools'



// https://vite.dev/config/
export default defineConfig({
  base: '/teacher/',
  plugins: [
    vue(),
    vueDevTools(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[name]'
    }),
    viteCompress({
      algorithm: 'gzip',
      ext: '.gz',
      filter: /\.(js|css|html|ico|json)$/,
      threshold: 1,
      deleteOriginFile: false,
    }),
    viteCompress({
      algorithm: 'brotliCompress',
      ext: '.br',
      filter: /\.(js|css|html|ico|json)$/,
      threshold: 1,
      deleteOriginFile: false,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    hmr: true,
    port: 14321,
    proxy: {
      '/api-teacher': {
        target: 'http://1.95.36.194:6003',
        changeOrigin: true,
        rewrite(path) {
          return path.replace('\/api-teacher', '')
        },
      }
    }
  }
})
