export default {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  overrides: [
    {
      files: ['**/*.json'],
      options: {
        trailingComma: 'none',
      },
    },
  ],
};
