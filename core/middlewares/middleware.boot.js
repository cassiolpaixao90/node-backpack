const middlewareDev = require('./middleware.dev')
const middlewareProd = require('./middleware.prod')
class Middleware {
  constructor(mode, path) {
    this.mode = mode
    this.path = path
  }
  development() {
    middlewareDev.execute()
  }

  production() {
    middlewareProd.execute()
  }
}

module.exports = Middleware
