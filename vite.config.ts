import path from "path"
import { defineConfig } from 'vite'
import {TanStackRouterVite as tanStackRouterVite} from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
      react(),
      tanStackRouterVite()
    ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})