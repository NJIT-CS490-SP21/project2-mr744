module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "babel-eslint",
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import'
  ],
  rules: {
        "react/no-array-index-key": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/react-in-jsx-scope": "off",
        // "import/prefer-default-export": "off",
        "no-restricted-syntax": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-unused-vars": "off",
        // "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        // "import/no-extraneous-dependencies": "off",
        "no-undef": "off",
  },
};