import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Crucial for GitHub Pages subpath deployment
  build: {
    outDir: 'dist',
    // 'hidden' still emits the map for local debugging but drops the
    // //# sourceMappingURL comment, so the 590KB map - 2.5x the bundle -
    // is not fetched by every visitor to the published site.
    sourcemap: 'hidden',
  }
})
