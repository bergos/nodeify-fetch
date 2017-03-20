var bufferFromReadable = require('./buffer-from-readable')

function patch (options) {
  options = options || {}

  if (options.body && options.body.readable) {
    return bufferFromReadable(options.body).then(function (buffer) {
      options.body = buffer

      return options
    })
  } else {
    return Promise.resolve(options)
  }
}

module.exports = patch
