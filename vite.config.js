import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const targetUrl = 'http://localhost:8080';
// const targetUrl = 'http://quizapplication-production-7fe4.up.railway.app';

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