function patch (options) {
  options = options || {}

  if (options.body && options.body.readable) {
    return new Promise(function (resolve, reject) {
      var content = []

      options.body.on('error', reject)
      options.body.on('end', function () {
        options.body = Buffer.concat(content)

        resolve(options)
      })

      options.body.on('data', function (chunk) {
        content.push(new Buffer(chunk))
      })
    })
  } else {
    return Promise.resolve(options)
  }
}

module.exports = patch
