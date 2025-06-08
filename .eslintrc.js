module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', // change to warn instead of error
    'no-unused-vars': 'warn',
    'default-case': 'warn'
  }
}