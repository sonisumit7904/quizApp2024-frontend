import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const targetUrl = "https://quizapplication-production-7fe4.up.railway.app";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: targetUrl,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
