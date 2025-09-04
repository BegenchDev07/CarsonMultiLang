// vite.config.ts
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';

// emulate __dirname in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Vite plugin to generate _redirects for Pages SPA fallback
const addCloudflarePagesRedirects = (): Plugin => ({
  name: 'add-cloudflare-pages-redirects',
  closeBundle() {
    const outDir = resolve(__dirname, 'dist');
    const redirectsFile = join(outDir, '_redirects');

    // SPA catch-all rule for Pages, force rewrite with !
    const content = `/*    /index.html    200!\n`;

    // Ensure dist exists
    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }

    // Write the _redirects file
    writeFileSync(redirectsFile, content, 'utf-8');
    console.log('✅ Cloudflare Pages _redirects file created in dist/');
  },
});

export default defineConfig({
  plugins: [
    react(),
    addCloudflarePagesRedirects(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
