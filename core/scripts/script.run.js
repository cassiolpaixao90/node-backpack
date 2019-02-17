class Run {
  constructor(fn, options) {
    this.fn = fn
    this.options = options
  }

  format(time) {
    return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
  }

  execute() {
    const task =
      typeof this.fn.default === 'undefined' ? this.fn : this.fn.default
    const start = new Date()
    console.info(
      `[${this.format(start)}] Starting '${task.name}${
        this.options ? ` (${this.options})` : ''
      }'...`
    )
  }
}

module.exports = Run
