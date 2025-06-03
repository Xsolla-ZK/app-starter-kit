import { withTamagui } from '@tamagui/next-plugin';

const plugins = [
  withTamagui({
    config: './src/config/tamagui.config.ts',
    components: ['@xsolla-zk/react'],
    outputCSS: './public/tamagui.css',
    disableExtraction: process.env.NODE_ENV === 'development',
    appDir: true,
    logTimings: true,
  }),
];

export default () => {
  /** @type {import('next').NextConfig} */
  let config = {
    // output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },

    transpilePackages: ['react-native-web'],
    reactStrictMode: true,
    images: {
      unoptimized: true,
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
