import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'ssr-dist',
    ssr: true,
    lib: {
      entry: path.resolve(__dirname, 'entry.server.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
  ssr: {
    format: 'cjs',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      themes: path.resolve(__dirname, './src/themes'),
      sprites: path.resolve(__dirname, './src/assets/sprites'),
      images: path.resolve(__dirname, './src/assets/images'),
      icons: path.resolve(__dirname, './src/assets/icons'),
      fonts: path.resolve(__dirname, './src/assets/fonts'),
    },
  },
})
