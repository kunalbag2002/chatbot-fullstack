import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Correct configuration for Vercel
export default defineConfig({
  plugins: [react()],
  base: '/', // <---- THIS IS THE FIX
  build: {
    outDir: 'dist'
  },
  server: {
    port: 5173
  }
})
