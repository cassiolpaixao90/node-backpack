const rimraf = require('rimraf')

class Fs {
  cleanDir(pattern, options) {
    return new Promise((resolve, reject) => {
      rimraf(pattern, { glob: options }, (err, result) =>
        err ? reject(err) : resolve(result)
      )
    })
  }
}

module.exports = new Fs()
