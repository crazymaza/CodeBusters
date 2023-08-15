// ../client/vite.config.ts
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { VitePWA } from "vite-plugin-pwa";
var __vite_injected_original_dirname = "/home/nozdrya/game/CodeBusters/packages/client";
dotenv.config();
var vite_config_default = defineConfig({
  build: {
    rollupOptions: {}
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  preview: {
    port: Number(process.env.CLIENT_PREVIEW_PORT) || 3003
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001
  },
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      filename: "serviceWorker.js",
      outDir: "./dist",
      srcDir: "./src",
      devOptions: {
        enabled: true
      },
      injectManifest: {
        globPatterns: ["**/*.{html,js,css,png,ttf}"]
      },
      workbox: {}
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      themes: path.resolve(__vite_injected_original_dirname, "./src/themes"),
      sprites: path.resolve(__vite_injected_original_dirname, "./src/assets/sprites"),
      images: path.resolve(__vite_injected_original_dirname, "./src/assets/images"),
      icons: path.resolve(__vite_injected_original_dirname, "./src/assets/icons"),
      fonts: path.resolve(__vite_injected_original_dirname, "./src/assets/fonts")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvbm96ZHJ5YS9nYW1lL0NvZGVCdXN0ZXJzL3BhY2thZ2VzL2NsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbm96ZHJ5YS9nYW1lL0NvZGVCdXN0ZXJzL3BhY2thZ2VzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9ub3pkcnlhL2dhbWUvQ29kZUJ1c3RlcnMvcGFja2FnZXMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudidcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5kb3RlbnYuY29uZmlnKClcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge30sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IE51bWJlcihwcm9jZXNzLmVudi5DTElFTlRfUE9SVCkgfHwgMzAwMCxcbiAgfSxcbiAgcHJldmlldzoge1xuICAgIHBvcnQ6IE51bWJlcihwcm9jZXNzLmVudi5DTElFTlRfUFJFVklFV19QT1JUKSB8fCAzMDAzLFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBfX1NFUlZFUl9QT1JUX186IHByb2Nlc3MuZW52LlNFUlZFUl9QT1JUIHx8IDMwMDEsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIFZpdGVQV0Eoe1xuICAgICAgc3RyYXRlZ2llczogJ2luamVjdE1hbmlmZXN0JyxcbiAgICAgIGZpbGVuYW1lOiAnc2VydmljZVdvcmtlci5qcycsXG4gICAgICBvdXREaXI6ICcuL2Rpc3QnLFxuICAgICAgc3JjRGlyOiAnLi9zcmMnLFxuICAgICAgZGV2T3B0aW9uczoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGluamVjdE1hbmlmZXN0OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntodG1sLGpzLGNzcyxwbmcsdHRmfSddLFxuICAgICAgfSxcbiAgICAgIHdvcmtib3g6IHt9LFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICB0aGVtZXM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy90aGVtZXMnKSxcbiAgICAgIHNwcml0ZXM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMvc3ByaXRlcycpLFxuICAgICAgaW1hZ2VzOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvYXNzZXRzL2ltYWdlcycpLFxuICAgICAgaWNvbnM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMvaWNvbnMnKSxcbiAgICAgIGZvbnRzOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvYXNzZXRzL2ZvbnRzJyksXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsb0JBQW9CO0FBQ3pWLE9BQU8sVUFBVTtBQUNqQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsZUFBZTtBQUp4QixJQUFNLG1DQUFtQztBQUt6QyxPQUFPLE9BQU87QUFHZCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxlQUFlLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTSxPQUFPLFFBQVEsSUFBSSxXQUFXLEtBQUs7QUFBQSxFQUMzQztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTSxPQUFPLFFBQVEsSUFBSSxtQkFBbUIsS0FBSztBQUFBLEVBQ25EO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixpQkFBaUIsUUFBUSxJQUFJLGVBQWU7QUFBQSxFQUM5QztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLGdCQUFnQjtBQUFBLFFBQ2QsY0FBYyxDQUFDLDRCQUE0QjtBQUFBLE1BQzdDO0FBQUEsTUFDQSxTQUFTLENBQUM7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDcEMsUUFBUSxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzlDLFNBQVMsS0FBSyxRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLE1BQ3ZELFFBQVEsS0FBSyxRQUFRLGtDQUFXLHFCQUFxQjtBQUFBLE1BQ3JELE9BQU8sS0FBSyxRQUFRLGtDQUFXLG9CQUFvQjtBQUFBLE1BQ25ELE9BQU8sS0FBSyxRQUFRLGtDQUFXLG9CQUFvQjtBQUFBLElBQ3JEO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
