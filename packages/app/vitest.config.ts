import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [],
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
      },

      isolate: true,
      setupFiles: ['./vitest.setup.js'],
    },
  }),
);
