import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to the repository name when deploying to GitHub Pages.
  // For local dev and most hosts, keeping it "/" works too; env var can override.
  base: process.env.VITE_BASE_PATH || "/Portfolio/"
})
