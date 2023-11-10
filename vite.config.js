import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  build: {
    lib: {
      entry: 'src/components/index.js',
      formats: ['es'],
      name: 'MyComponents',
      fileName: (format) => `my-components.${format}.js`,
    },
    rollupOptions: {
      output: {
        dir: 'dist/components',
      },
    },
  },
})
