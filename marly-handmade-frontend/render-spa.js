// marly-handmade-frontend/render-spa.js
// Este script ejecuta después del build para Render
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 1. Copia index.html a 200.html (Render lo usa para SPA)
const indexHtml = path.join(__dirname, 'dist', 'index.html')
const twoHundredHtml = path.join(__dirname, 'dist', '200.html')
fs.copyFileSync(indexHtml, twoHundredHtml)

// 2. Crea .static.json para Render
const staticConfig = {
  "rewrites": [
    {
      "source": "**",
      "destination": "/index.html"
    }
  ]
}

fs.writeFileSync(
  path.join(__dirname, 'dist', '.static.json'),
  JSON.stringify(staticConfig, null, 2)
)

console.log('✅ Render SPA configuration complete!')