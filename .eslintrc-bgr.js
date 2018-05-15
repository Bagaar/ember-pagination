module.exports = {
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'asyncArrow': 'always',
      'named': 'never'
    }]
  }
};
