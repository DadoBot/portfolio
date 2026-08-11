import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves the site under /portfolio/, but that base path
  // breaks the dev server root (and LAN access from other devices) — only
  // apply it for production builds.
  base: command === 'build' ? '/portfolio/' : '/',
}))
