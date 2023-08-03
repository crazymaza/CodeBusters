import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  preview: {
    port: Number(process.env.CLIENT_PREVIEW_PORT) || 3003,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      filename: 'serviceWorker.js',
      devOptions: {
        enabled: true,
      },
      injectManifest: {
        globPatterns: ['**/*.{html,js,css,png,ttf}'],
      },
      workbox: {},
    }),
  ],
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
