import { join } from 'node:path';
import { withTamagui } from '@tamagui/next-plugin';

const plugins = [
  withTamagui({
    config: '../../packages/config/src/tamagui.config.ts',
    components: ['@app/ui'],
    appDir: true,
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction: process.env.NODE_ENV === 'development',
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],

    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true;
      }
    },
  }),
];

export default () => {
  /** @type {import('next').NextConfig} */
  let config = {
    output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    transpilePackages: ['react-native', 'react-native-web', 'solito', 'react-native-reanimated'],
    experimental: {
      scrollRestoration: true,
    },
  };

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    };
  }

  return config;
};
