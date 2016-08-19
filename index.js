var isoFetch = require('isomorphic-fetch')
var patchResponse = require('./lib/patch-response')

function fetch (url, options) {
  return isoFetch(url, options).then(function (res) {
    return patchResponse(res)
  })
}

module.exports = fetch
