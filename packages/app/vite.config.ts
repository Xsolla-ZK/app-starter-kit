import { tamaguiPlugin } from '@tamagui/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tamaguiPlugin({
      config: './tamagui.config.ts',
      components: [
        '@tamagui/core',
        '@xsolla-zk/react' /* Добавьте сюда другие UI киты, если есть */,
      ],
      // 👇 КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: Отключаем оптимизацию в тестах
      optimize: !process.env.VITEST,
    }),
    tsconfigPaths(),
  ].filter(Boolean),
  resolve: {
    alias: {
      // Эта строка нужна, если вы используете кастомные компоненты,
      // но может быть не нужна для вашего случая.
      // "@tamagui/stacks": path.resolve(__dirname, "src/components/stacks"),
    },
  },
});
