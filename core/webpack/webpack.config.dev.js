const fs = require('fs')
const webpack = require('webpack')
const path = require('path')

module.exports = options => {
  const mainBabelOptions = {
    babelrc: true,
    cacheDirectory: true,
    presets: []
  }

  mainBabelOptions.presets.push(require('../../.babelrc'))

  const nodeModules = fs.readdirSync('node_modules').filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  return {
    mode: options.env === 'development' ? 'development' : 'production',
    target: 'node',
    devtool: 'source-map',
    externals: [
      function(context, request, callback) {
        var pathStart = request.split('/')[0]
        if (
          nodeModules.indexOf(pathStart) >= 0 &&
          request !== 'webpack/hot/signal.js'
        ) {
          return callback(null, 'commonjs ' + request)
        }
        callback()
      }
    ],
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
    entry: ['webpack/hot/signal.js', './src/index.js'],
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'backend.js'
    },
    recordsPath: path.join(__dirname, 'build/_records'),
    module: {
      rules: [
        {
          test: /\.(js)$/,
          loader: require.resolve('babel-loader'),
          exclude: [/node_modules/],
          options: mainBabelOptions
        }
      ]
    },
    optimization: {
      noEmitOnErrors: true
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.env),
        __DEV__: options.env === 'development'
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
      new webpack.HotModuleReplacementPlugin({ quiet: true })
    ]
  }
}
