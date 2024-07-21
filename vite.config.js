import path from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

const srcPath = path.resolve(__dirname, 'src')

export default defineConfig({
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      '@/': `${srcPath}/`,
    }
  },
  plugins: [
    vue(),
    svgLoader({ defaultImport: 'url' })
  ]
})