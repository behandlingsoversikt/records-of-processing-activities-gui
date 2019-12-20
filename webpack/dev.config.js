import path from 'path';
import merge from 'webpack-merge';
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin';

import baseConfig from './base.config';

export default merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  output: {
    filename: '[name].js'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8141,
    before: app => app.get('/config.js', (_, res) => res.status(204).send()),
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }]
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        include: [
          path.resolve(__dirname, '../node_modules/ansi-styles'),
          path.resolve(__dirname, '../node_modules/chalk'),
          path.resolve(__dirname, '../node_modules/react-dev-utils')
        ]
      },
      {
        test: /\.(js|ts)x?$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new ErrorOverlayPlugin()]
});
