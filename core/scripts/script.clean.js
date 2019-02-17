const Fs = require('../utils/utils.fs')
const path = require('path')

class Clean {
  execute() {
    return Promise.all([
      Fs.cleanDir(path.resolve('build/*'), {
        nosort: true,
        dot: true,
        ignore: [path.resolve('build/.git')]
      })
    ])
  }
}

module.exports = new Clean()
