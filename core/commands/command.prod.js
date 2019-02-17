const middlewareBoot = require('../middlewares/middleware.boot')

class Production {
  constructor(value) {
    this.value = value
    this.middleware = new middlewareBoot(this.mode, this.path)
  }

  get name() {
    return `${this.value}`
  }

  get mode() {
    return process.argv[2] || 'prod'
  }

  get path() {
    return process.argv[3] || 'src'
  }

  execute() {
    console.log('Prod command ok')
    console.log('mode', this.mode)
    console.log('path', this.path)
    this.middleware.production()
    process.exit(0)
  }
}

module.exports = Production
