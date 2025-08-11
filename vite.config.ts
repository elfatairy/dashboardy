
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: __dirname,
  plugins: [],
  server: {
    open: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    }
  }
});
