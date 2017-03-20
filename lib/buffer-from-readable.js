var concat = require('concat-stream')

function bufferFromReadable (readable) {
  return new Promise(function (resolve, reject) {
    var stream = concat()

    readable.on('error', reject)
    readable.on('end', function () {
      resolve(stream.getBody())
    })

    readable.pipe(stream)
  })
}

module.exports = bufferFromReadable
