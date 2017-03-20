var inherits = require('inherits')
var Readable = require('readable-stream')

function ReadableFromArrayBuffer (arrayBuffer) {
  var self = this

  Readable.call(this)

  this._read = function () {
    self.push(new Buffer(arrayBuffer))
    self.push(null)
  }
}

inherits(ReadableFromArrayBuffer, Readable)

module.exports = ReadableFromArrayBuffer
