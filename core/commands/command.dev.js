const path = require('path')
const middlewareBoot = require('../middlewares/middleware.boot')
class Development {
  constructor(value) {
    this.value = value
    this.middleware = new middlewareBoot(this.mode, this.path)
  }

  get mode() {
    return process.argv[2] || 'dev'
  }

  get name() {
    return `${this.value}`
  }

  get path() {
    return process.argv[3] || 'src/index.js'
  }

  execute() {
    // console.log(path.resolve('.babelrc'))
    this.middleware.development()
    // process.exit(0)
  }
}

module.exports = Development
