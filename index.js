const isoFetch = require('isomorphic-fetch')
const patchRequest = require('./lib/patchRequest')
const patchResponse = require('./lib/patchResponse')

function fetch (url, options) {
  return patchRequest(options).then((options) => {
    return isoFetch(url, options).then((res) => {
      return patchResponse(res)
    })
  })
}

fetch.Headers = global.Headers

module.exports = fetch
