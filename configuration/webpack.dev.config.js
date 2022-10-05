/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge')
const webpackConfiguration = require('../webpack.config')
const environment = require('./environment')
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin')

module.exports = merge(webpackConfiguration, {
  mode: 'development',
  /* Manage source maps generation process */
  devtool: 'eval-source-map',
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  /* Development Server Configuration */
  devServer: {
    ...environment.server,
    open: true,
    hot: true,
    historyApiFallback: true,
    watchFiles: {
      options: {
        awaitWriteFinish: {
          stabilityThreshold: 500,
        },
      },
      paths: ['src/**/*'],
    },
    static: {
      directory: environment.paths.output,
      publicPath: '/',
    },
  },

  /* Additional plugins configuration */
  plugins: [
    new ExtraWatchWebpackPlugin({
      dirs: [environment.paths.views],
    }),
  ],
})
