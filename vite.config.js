import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //这个resolve是vite的配置，用来配置别名的
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      }
  ]
  }
})
