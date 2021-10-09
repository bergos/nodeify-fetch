import ReadableError from 'readable-error'
import arrayBufferToReadable from './arrayBufferToReadable.js'
import Patchable from './Patchable.js'
import whatwgToReadable from './whatwgToReadable.js'

function patch (res) {
  if (res.bodyUsed) {
    res.body = new ReadableError(new Error('body already in use'))

    return res
  }

  // body is already a readable
  if (res.body && res.body.readable) {
    return res
  }

  // body is a WHATWG stream
  if (res.body && typeof res.body.getReader === 'function') {
    // replace response with a patchable object...
    return new Patchable(res, {
      // ...and replace the body with a readable stream
      body: whatwgToReadable(res.body.getReader())
    })
  }

  // for all other cases, read the whole arrayBuffer and wrap it with a readable stream
  res.body = arrayBufferToReadable(() => res.arrayBuffer())

  return res
}

export default patch
