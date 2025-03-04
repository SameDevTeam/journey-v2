import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    // Ensure all assets from public folder are copied to build output
    assetsDir: 'assets',
    rollupOptions: {
      // Ensure web.config is properly handled
      output: {
        manualChunks: undefined,
      },
    },
  },
})
