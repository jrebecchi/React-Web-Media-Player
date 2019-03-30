module.exports = require('babel-jest').createTransformer({
  presets: ['@babel/react', '@babel/preset-env'],
  plugins: [
    "@babel/plugin-proposal-class-properties"
  ]
});