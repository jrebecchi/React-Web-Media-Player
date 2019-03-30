module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactWebMediaPlayer',
      entry: './src/ReactWebMediaPlayer.js',
      externals: {
        react: 'React'
      }
    }
  }
}
