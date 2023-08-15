/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'lugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: ['react-refresh'],
  ignorePatterns: ['vite.config.ts', '.eslintrc.cjs'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-useless-escape': 2,
    'no-script-url': 2,
    'no-template-curly-in-string': 2,
    'linebreak-style': 2,
    'no-use-before-define': 2,
    'no-param-reassign': 2,
    'no-console': 2,
    'no-return-await': 2,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 2,
    'no-shadow': 2,
    'no-var': 2,
    '@typescript-eslint/no-var-requires': 2,
    complexity: 2,
    'max-depth': 2,
    'max-nested-callbacks': 2,
    'func-style': [
      2,
      'declaration',
      {
        allowArrowFunctions: true,
      },
    ],
  },
};
