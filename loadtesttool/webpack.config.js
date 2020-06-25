const path = require('path');

module.exports = Object.assign(require('./webpack.config.js'), {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'src'),
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
})
