import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@customTypes': path.resolve(__dirname, './src/types'),
      '@css': path.resolve(__dirname, './src/css'),
      "@img": path.resolve(__dirname, './src/assets/img'),
      "@svg": path.resolve(__dirname, "./src/assets/svg"),
      "@icons": path.resolve(__dirname, "./src/assets/icons"),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
