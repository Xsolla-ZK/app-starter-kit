module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxRuntime: 'automatic', unstable_transformImportMeta: true }],
    ],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['../..'],
          alias: {
            // define aliases to shorten the import paths
            app: '../../packages/app',
            '@app/ui': '../../packages/ui',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
        },
      ],
      ...(process.env.EAS_BUILD_PLATFORM === 'android'
        ? []
        : [
            [
              '@tamagui/babel-plugin',
              {
                components: ['@app/ui', '@xsolla-zk/react'],
                config: '../../packages/config/src/tamagui.config.ts',
                logTimings: true,
                disableExtraction: process.env.NODE_ENV === 'development',
              },
            ],
          ]),
      // if you want reanimated support
      'react-native-reanimated/plugin',
    ],
  };
};
