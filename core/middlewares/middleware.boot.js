class Middleware {
  constructor(mode, path) {
    this.mode = mode
    this.path = path
  }
  development() {
    const webpackConfig = require('../webpack/webpack.config.dev')
    console.log(webpackConfig)
    // const devMiddlewares = require('./middleware.dev')
    // devMiddlewares(app, webpackConfig)
  }

  production() {
    console.log('pa')
  }
}

module.exports = Middleware
