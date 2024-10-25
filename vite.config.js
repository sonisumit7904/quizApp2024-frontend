import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const targetUrl = process.env.NODE_ENV === 'production' 
  ? 'http://quizapplication-production-7fe4.up.railway.app'
  : 'http://localhost:8080';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/Quiz': {
        target: targetUrl,
        changeOrigin: true,
        secure: false,
      },
      '/Question': {
        target: targetUrl,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
