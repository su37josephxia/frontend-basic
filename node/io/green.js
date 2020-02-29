const stream = require('stream')

class GreenStream extends stream.Writable {
  constructor(options) {
    super(options)
  }

  _write(chunk, encoding, cb) {
    process.stdout.write(`\u001b[32m${chunk}\u001b[39m`)
    cb()
  }
}

process.stdin.pipe(new GreenStream())
