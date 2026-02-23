import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 1111,
  },
  resolve: {
    alias: {
      '@payconductor/react': resolve(__dirname, '../../packages/react/dist/index.es.js'),
    },
  },
});
