import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['nutrition-bot-frontend.onrender.com']
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3031',
        changeOrigin: true
      }
    }
  }
});

