import { robots } from 'vite-plugin-robots'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // robots()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
