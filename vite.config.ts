import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cgartco6.github.io/',          // ← MUST match your repo name exactly!
  // If your repo is literally named "cgartco6.github.io" then use base: '/'
  // Otherwise always: base: '/YOUR-REPO-NAME/'
})
