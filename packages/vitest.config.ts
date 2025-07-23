// ./vitest.config.ts

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Базовая конфигурация, которую будут расширять другие
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Включает глобальные API (describe, it, expect)
    css: true, // Включает поддержку CSS в компонентах
  },
});
