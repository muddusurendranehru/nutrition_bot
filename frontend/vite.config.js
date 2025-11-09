import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './main.jsx'  // Point to main.jsx in frontend root
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3031',  // Updated to correct backend port
        changeOrigin: true
      }
    }
  }
});

