import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Routes to main1.py (Catalog Service)
      '/api/catalog': {
        target: 'http://localhost:8000', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/catalog/, '')
      },
      // Routes to main2.py (Rating Service)
      '/api/ratings': {
        target: 'http://localhost:8001', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ratings/, '')
      },
      // Routes to main3.py (Review Service v1/v2)
      '/api/reviews': {
        target: 'http://localhost:8002', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/reviews/, '')
      }
    }
  }
});