class Production {
  constructor(value) {
    this.value = value
  }
  get name() {
    return `${this.value}`
  }

  execute() {
    console.log('Prod command ok')
    process.exit(0)
  }
}

module.exports = Production
