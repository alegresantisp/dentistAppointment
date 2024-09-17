module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    rules: {
      // Aquí puedes agregar o modificar reglas específicas
      'semi': ['error', 'always'],
      'quotes': ['error', 'double'],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  };
  