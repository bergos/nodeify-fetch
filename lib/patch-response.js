var Readable = require('stream').Readable
var ReadableFromWhatwg = require('./readable-from-whatwg')

function patch (res) {
  res.body = res.body || {}

  if (res.body.getReader) {
    res.body.getReadable = function () {
      return new ReadableFromWhatwg(res.body.getReader())
    }
  } else {
    res.body.getReadable = function () {
      if (res.body.readable) {
        return res.body
      } else {
        var readable = new Readable()

        readable._read = function () {
          if (res.bodyUsed) {
            return
          }

          res.arrayBuffer().then(function (data) {
            readable.push(new Buffer(data))
            readable.push(null)
          }).catch(function (err) {
            readable.emit('error', err)
          })
        }

        return readable
      }
    }
  }

  return res
}

module.exports = patch
