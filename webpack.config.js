const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/ReactWebMediaPlayer.js',
  output: {
    path: path.resolve('lib'),
    filename: 'ReactWebMediaPlayer.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }

}