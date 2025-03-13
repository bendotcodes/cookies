import path from 'path';

export default {
  mode: 'development',
  entry: './src/client',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve('./src')],
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        include: [path.resolve('./src')],
        use: 'ts-loader',
      },
    ],
  },
};
