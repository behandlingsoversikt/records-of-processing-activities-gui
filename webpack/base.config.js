import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BaseHrefWebpackPlugin } from 'base-href-webpack-plugin';

export default {
  entry: {
    main: './src/entrypoints/main/index.tsx',
    auth: './src/entrypoints/auth/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      hidePathInfo: true,
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0,
      automaticNameDelimiter: '.',
      cacheGroups: {
        default: false,
        mainVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'main.vendors',
          filename: '[name].bundle.js',
          chunks: ({ name }) => name === 'main'
        },
        authVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'auth.vendors',
          filename: '[name].bundle.js',
          chunks: ({ name }) => name === 'auth'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, '../.babelrc')
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new (class ChunksFromEntryPlugin {
      apply(compiler) {
        compiler.hooks.emit.tap('ChunksFromEntryPlugin', compilation => {
          compilation.hooks.htmlWebpackPluginAlterChunks.tap(
            'ChunksFromEntryPlugin',
            (_, { plugin }) =>
              compilation.entrypoints
                .get(plugin.options.entry)
                .chunks.map(chunk => ({
                  names: chunk.name ? [chunk.name] : [],
                  files: chunk.files.slice(),
                  size: chunk.modulesSize(),
                  hash: chunk.hash
                }))
          );
        });
      }
    })(),
    new HtmlWebpackPlugin({
      entry: 'main',
      template: './src/entrypoints/main/index.html',
      filename: 'index.html',
      favicon: './src/images/favicon.ico'
    }),
    new HtmlWebpackPlugin({
      entry: 'auth',
      template: './src/entrypoints/auth/index.html',
      filename: 'auth.html',
      favicon: './src/images/favicon.ico'
    }),
    new BaseHrefWebpackPlugin({
      baseHref: '/'
    })
  ]
};
