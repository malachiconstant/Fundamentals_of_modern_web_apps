import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react'`, // Ensure React is injected for JSX
    loader: 'jsx', // Explicitly set the loader for JSX
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure Vite resolves .js files with JSX
  },
})