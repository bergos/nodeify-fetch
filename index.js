var isoFetch = require('isomorphic-fetch')
var patchRequest = require('./lib/patch-request')
var patchResponse = require('./lib/patch-response')

function fetch (url, options) {
  return patchRequest(options).then(function (options) {
    return isoFetch(url, options).then(function (res) {
      return patchResponse(res)
    })
  })
}

module.exports = fetch
