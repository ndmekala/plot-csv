const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
