import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Указываем файл для настройки тестов React Native
    setupFiles: './tests/setup.ts',
  },
});
