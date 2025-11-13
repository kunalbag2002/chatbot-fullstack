import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Correct config for Vercel deployment
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
  },
  // ⚠️ The base MUST be "/" for Vercel
  base: '/',
});
