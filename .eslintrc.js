module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    semi: 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'arrow-body-style': 'off',
    'operator-linebreak': 'off',
    'no-confusing-arrow': 'off',
  },
}
