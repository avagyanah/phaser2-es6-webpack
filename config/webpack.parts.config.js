const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
})

exports.cleanup = paths => ({
  plugins: [
    new CleanWebpackPlugin(paths, { root: process.cwd(), verbose: false }),
  ],
})

exports.loadJs = ({ babelOptions }) => ({
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
      {
        test: /pixi\.js/,
        use: ['expose-loader?PIXI'],
      },
      {
        test: /phaser-arcade-physics\.js/,
        use: ['expose-loader?Phaser'],
      },
    ],
  },
})

exports.sourceMaps = method => ({
  devtool: method,
})

exports.minifyJavaScript = () => ({
  plugins: [new UglifyWebpackPlugin({ sourceMap: true })],
})

exports.envVar = env => ({
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
})

exports.extractChunks = bundles => ({
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    ...bundles.map(bundle => new webpack.optimize.CommonsChunkPlugin(bundle)),
  ],
})

exports.isVendor = module => /node_modules/.test(module.resource)

exports.scopeHoisting = () => ({
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
})

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
})

exports.analyze = () => ({
  plugins: [new BundleAnalyzerPlugin()],
})
