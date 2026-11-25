import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // html2pdf (~740 kB) is the only chunk above the default limit, and it is lazy-loaded
    // only when someone downloads the resume.
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Long-lived vendor chunks so returning visitors re-download only app code.
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
