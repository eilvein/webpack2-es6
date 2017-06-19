module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module'
  },
  'plugins': [],
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'semi': 0,
    'no-console': 0
  }
};
