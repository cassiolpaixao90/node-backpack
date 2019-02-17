const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.config.prod')

class MiddlewareProd {
  execute() {
    return new Promise((resolve, reject) => {
      webpack(webpackConfig).run((err, stats) => {
        if (err) {
          return reject(err)
        }

        // console.info(stats.toString(webpackConfig[0].stats))
        if (stats.hasErrors()) {
          return reject(new Error('Webpack compilation errors'))
        }

        return resolve()
      })
    })
  }
}
module.exports = new MiddlewareProd()
