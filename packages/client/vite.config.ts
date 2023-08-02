import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {},
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  preview: {
    port: Number(process.env.CLIENT_PREVIEW_PORT) || 3003,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  plugins: [react()],
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
