import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    // Включаем глобальные API (describe, it, expect) без необходимости импортов
    globals: true,
    // Устанавливаем окружение, имитирующее браузер (DOM)
    environment: 'jsdom',
    // Указываем файл, который будет запускаться перед каждым тестом
    setupFiles: './tests/setup.ts',
  },
});
