import { defineConfig, splitVendorChunkPlugin } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    outDir: path.join(__dirname, '..', 'server', 'admin'),
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     },
    //   },
    // },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:50731',
        changeOrigin: true,
        secure: false,
      },
      '/locales': {
        target: 'http://localhost:50731',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
