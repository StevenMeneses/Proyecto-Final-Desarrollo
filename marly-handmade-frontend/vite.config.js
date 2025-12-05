import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// Para obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // ← CAMBIADO de './' a '/' para SPA con BrowserRouter
  
  // Configuración CRÍTICA para Render
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        // Estructura plana que Render entiende mejor
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Asegura que los assets tienen hash único
    assetsDir: 'assets',
    emptyOutDir: true
  },
  
  // Para desarrollo local
  server: {
    port: 5173,
    host: true,
    // Esto emula comportamiento de producción
    historyApiFallback: {
      rewrites: [
        { from: /^\/.*$/, to: '/index.html' }
      ]
    }
  },
  
  // Optimizaciones para producción
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})