import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const targetUrl = process.env.NODE_ENV === 'production' 
  ? 'https://quizapplication-production-7fe4.up.railway.app'  // Your Railway backend URL
  : 'http://localhost:8080';  // Your local backend URL

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
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(targetUrl)
  }
})
