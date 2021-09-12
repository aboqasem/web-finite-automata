import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

/* Docs: https://vitejs.dev/config/ */
export default defineConfig({
  plugins: [reactRefresh(), viteSingleFile()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        manualChunks: () => 'app.js',
      },
    },
  },
  server: {
    open: true,
  },
});
