import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Required for GitHub Pages project sites:
  // https://<user>.github.io/<repo>/
  base: '/blood-bowl-roster/',
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.js',
  },
})

