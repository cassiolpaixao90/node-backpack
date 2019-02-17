class DevCommand {
  constructor(value) {
    this.value = value
  }

  get name() {
    return `${this.value}`
  }

  execute() {
    console.log('Dev command ok')
    process.exit(0)
  }
}

module.exports = DevCommand
