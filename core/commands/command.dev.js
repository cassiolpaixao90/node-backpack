class Development {
  constructor(value) {
    this.value = value
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
    console.log('mode', this.mode)
    console.log('path', this.path)
    process.exit(0)
  }
}

module.exports = Development
