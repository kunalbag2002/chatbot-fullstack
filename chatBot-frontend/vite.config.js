import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ this is CRUCIAL for Vercel
  build: {
    outDir: 'dist'
  }
})
