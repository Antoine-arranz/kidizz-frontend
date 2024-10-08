import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import path from 'path'

export default defineConfig({
  server: {
    port: 4000
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    'process.env': { VUE_APP_VERSION: require('./package.json').version }
  },
  plugins: [vue()]
})
