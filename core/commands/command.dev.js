class Development {
  constructor(value) {
    this.value = value
  }

  get name() {
    return `${this.value}`
  }

  execute() {
    process.exit(0)
  }
}

module.exports = Development
