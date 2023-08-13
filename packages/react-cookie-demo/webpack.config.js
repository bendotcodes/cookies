const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve('./src')],
        loader: 'babel-loader',
      },
    ],
  },
};
