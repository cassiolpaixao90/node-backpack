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
    return task(this.options).then(resolution => {
      const end = new Date()
      const time = end.getTime() - start.getTime()
      console.info(
        `[${this.format(end)}] Finished '${task.name}${
          this.options ? ` (${this.options})` : ''
        }' after ${time} ms`
      )
      return resolution
    })
  }
}

module.exports = Run
