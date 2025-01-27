import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // Map your CSS variables to Ant Design tokens
          '@primary-color': 'var(--primary-color)',
          '@text-color': 'var(--text-color)',
          '@body-background': 'var(--background-color)',
          '@link-color': 'var(--secondary-color)',
          '@success-color': 'var(--accent-color)',
        },
        javascriptEnabled: true,
      },
    },
  },
});