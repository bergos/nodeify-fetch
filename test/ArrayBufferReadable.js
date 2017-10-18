/* global describe, it */

const assert = require('assert')
const ArrayBufferReadable = require('../lib/ArrayBufferReadable')

describe('ArrayBufferReadable', () => {
  it('should be a constructor', () => {
    assert.equal(typeof ArrayBufferReadable, 'function')
  })

  it('should emit an end event', () => {
    const arrayBuffer = new ArrayBuffer()

    const readable = new ArrayBufferReadable(() => {
      return Promise.resolve(arrayBuffer)
    })

    return new Promise((resolve) => {
      readable.on('end', resolve)

      readable.resume()
    })
  })

  it('should emit an data event', () => {
    const arrayBuffer = Buffer.from([0, 1, 2, 3])

    const readable = new ArrayBufferReadable(() => {
      return Promise.resolve(arrayBuffer)
    })

    return new Promise((resolve) => {
      readable.on('data', (chunk) => {
        assert.deepEqual(chunk, arrayBuffer)

        resolve()
      })

      readable.resume()
    })
  })
})
