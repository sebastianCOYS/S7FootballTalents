import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    sourcemap: false, 
    rollupOptions: {
      output: {
        manualChunks: {    
          'react-vendor': ['react', 'react-dom', 'react-router', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled'],
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: false,
  }
})
