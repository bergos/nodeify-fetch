var ReadableFromArrayBuffer = require('./readable-from-arraybuffer')
var ReadableFromWhatwg = require('./readable-from-whatwg')

function patch (res) {
  // not implemented in Firefix 51
  /* if (!res.body) {
    return res
  } */

  if (res.body && res.body.getReader) {
    res.readable = function () {
      return Promise.resolve(new ReadableFromWhatwg(res.body.getReader()))
    }
  } else {
    res.readable = function () {
      if (res.body && res.body.readable) {
        return Promise.resolve(res.body)
      } else {
        if (res.bodyUsed) {
          return Promise.reject(new Error('body already in use'))
        }

        return res.arrayBuffer().then(function (arrayBuffer) {
          return new ReadableFromArrayBuffer(arrayBuffer)
        })
      }
    }
  }

  return res
}

module.exports = patch
