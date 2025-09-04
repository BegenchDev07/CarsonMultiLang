import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// emulate __dirname in ESM
const __dirname = dirname(fileURLToPath(import.meta.url))

const addCloudflareRedirects = (): Plugin => ({
  name: 'add-cloudflare-redirects',
  closeBundle() {
    const outDir = resolve(__dirname, 'dist')
    const redirectsFile = join(outDir, '_redirects')
    const content = '/* /index.html 200\n'

    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true })
    }

    writeFileSync(redirectsFile, content, 'utf-8')
    console.log('✅ Cloudflare Pages _redirects file created in dist/')
  },
})

export default defineConfig({
  plugins: [
    react(),
    addCloudflareRedirects(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
