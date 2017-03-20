var inherits = require('inherits')
var Readable = require('readable-stream')

function ReadableFromWhatwg (stream) {
  var self = this

  Readable.call(this)

  this._read = function () {
    stream.read().then(function (chunk) {
      if (chunk.done) {
        self.push(null)
      } else {
        self.push(new Buffer(chunk.value))
      }
    }).catch(function (err) {
      self.emit('error', err)
    })
  }
}

inherits(ReadableFromWhatwg, Readable)

module.exports = ReadableFromWhatwg
