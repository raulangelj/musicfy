module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ['error', 'never'],
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-restricted-exports': 'off',
    'no-unused-expressions': 'off',
    'react/forbid-prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-restricted-syntax': ['error', 'FunctionExpression', 'WithStatement', "BinaryExpression[operator='in']"],
    'react/function-component-definition': 'off',
  },
  globals: {
    React: 'readonly',
    ReactDOM: 'readonly',
    document: 'readonly',
  },
}
