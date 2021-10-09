/* global fetch */

import patchRequest from './lib/patchRequest.js'
import patchResponse from './lib/patchResponse.js'

const Headers = window.Headers

function nodeifyFetch (url, options) {
  return patchRequest(options).then(options => {
    return fetch(url, options).then(res => {
      return patchResponse(res)
    })
  })
}

export {
  nodeifyFetch as default,
  Headers
}
