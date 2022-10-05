const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const environment = require('./configuration/environment')
const pages = fs.readdirSync(`${environment.paths.pages}`)
const currentYear = new Date().getFullYear()

function generateHtmlPlugins() {
  return pages.map((page) => {
    const parts = page.split('.')
    const name = parts[0]
    const extension = parts[1]
    return new HtmlWebpackPlugin({
      filename: `${name}.${extension}`,
      template: `${environment.paths.views}/layout.html`,
      inject: true,
    })
  })
}
function generateHtmlPartialsPlugins(templateDir) {
  return pages.map((item) => {
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    return {
      path: `${templateDir}/${name}.${extension}`,
      priority: 'replace',
      location: 'page',
      template_filename: `${name}.html`,
    }
  })
}
const htmlWebpackPartial = generateHtmlPartialsPlugins(
  `${environment.paths.pages}`
)
const htmlWebpack = generateHtmlPlugins()

module.exports = {
  entry: [
    `${environment.paths.source}/js/app.js`,
    `${environment.paths.source}/scss/styles.scss`,
  ],
  output: {
    path: environment.paths.output,
    filename: 'assets/js/app.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sass|scss)$/,
        include: `${environment.paths.source}/scss`,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 8192,
          },
        },
        generator: {
          filename: '[name].[ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  plugins: [
    ...htmlWebpack,
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `${environment.paths.source}/images`,
          to: `${environment.paths.output}/assets/images`,
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
        {
          from: `${environment.paths.source}/fonts`,
          to: `${environment.paths.output}/assets/fonts`,
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
      ],
    }),
    new HtmlWebpackPartialsPlugin([
      ...htmlWebpackPartial,
      {
        path: `${environment.paths.components}/nav.html`,
        location: 'nav',
        priority: 'replace',
        template_filename: pages,
      },
      {
        path: `${environment.paths.components}/hero.html`,
        location: 'hero',
        priority: 'replace',
        template_filename: pages,
      },
      {
        path: `${environment.paths.components}/footer.html`,
        location: 'footer',
        template_filename: pages,
        options: {
          copyright: `@${currentYear} All right reserved`,
        },
      },
    ]),
  ],
}