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
    'import',
    // 'testing-library',
  ],
  rules: {
        "react/no-array-index-key": "off", //fine
        "react-hooks/exhaustive-deps": "off", //fine
        // "react/react-in-jsx-scope": "off", // comment this one out
        // "no-restricted-syntax": "off", // iterators generators 
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        // "no-unused-vars": "off", // comment this one out
        "no-undef": "off", //comment this one out
  },
};