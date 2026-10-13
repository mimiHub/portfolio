import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // '@/components/...' 처럼 절대경로 import — 폴더 깊이가 깊어져도 ../../../ 지옥을 피함
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
