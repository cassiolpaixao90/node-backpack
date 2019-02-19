const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator')

const babelRc = path.resolve('.babelrc');

const mainBabelOptions = {
  babelrc: true,
  cacheDirectory: true,
  presets: [],
  plugins: []
}

const hasBabelRc = () => fs.existsSync(babelRc)

if (hasBabelRc) {
  console.log('babel root');
} else {
  mainBabelOptions.presets.push('../../.babelrc')
}

module.exports = {
  mode: 'production',
  target: 'node',
  devtool: 'source-map',
  externals: nodeExternals({
    modulesFromFile: true,
    whitelist: [
      /\.(eot|woff|woff2|ttf|otf)$/,
      /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
      /\.(mp4|mp3|ogg|swf|webp)$/,
      /\.(css|scss|sass|less|styl)$/
    ]
  }),
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  node: {
    __filename: true,
    __dirname: true
  },
  entry: {
    main: [path.resolve('src/index.js')]
  },
  output: {
    path: path.resolve('build'),
    filename: 'backend.js',
    publicPath: path.resolve('src'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: require.resolve('babel-loader'),
        exclude: [/node_modules/, path.resolve('build')],
        options: {
          presets: [...mainBabelOptions.presets],
          plugins: [...mainBabelOptions.plugins]
        }
      }
    ]
  },
  optimization: {
    noEmitOnErrors: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false
    }),
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: false,
      banner: `require('${
        require.resolve('source-map-support').indexOf(process.cwd()) === 0
          ? 'source-map-support/register'
          : require.resolve('source-map-support/register')
      }')`
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false
    }),
    new JavaScriptObfuscator({
      rotateUnicodeArray: true
    })
  ]
}
