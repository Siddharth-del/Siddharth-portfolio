import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths: deploys at a domain root (Netlify, Vercel) or a sub-path (GitHub Pages).
  base: './',
  plugins: [react()],
});
