import { tamaguiPlugin } from '@tamagui/vite-plugin';
import { one } from 'one/vite';
import type { UserConfig } from 'vite';

export default {
  plugins: [
    one({
      react: {
        compiler: process.env.NODE_ENV === 'production',
      },

      web: {
        defaultRenderMode: 'ssg',
      },

      native: {
        // set to the key of your native app
        // will call AppRegistry.registerComponent(app.key)
        key: 'xsolla-zk-app-starter',
      },
      deps: {
        burnt: {
          '**/*.js': ['jsx'],
        },
        'react-native-reanimated': {
          '**/*.js': ['jsx'],
        },
      },
      optimization: {
        barrel: ['@xsolla-zk/icons'],
      },
    }),

    tamaguiPlugin({
      // optimize: process.env.NODE_ENV === 'production',
      optimize: true,
      components: ['@xsolla-zk/react'],
      config: './src/config/tamagui.config.ts',
      outputCSS: './src/tamagui.css',
      disableExtraction: process.env.NODE_ENV === 'development',
    }),
  ],
  ssr: {
    noExternal: true,
  },

  optimizeDeps: {
    include: ['@tamagui/core', '@xsolla-zk/config'],
  },
} satisfies UserConfig;
