import { deepStrictEqual, rejects, strictEqual } from 'assert'
import { describe, it } from 'mocha'
import arrayBufferToReadable from '../lib/arrayBufferToReadable.js'
import getStream from '../lib/getStream.js'

describe('arrayBufferToReadable', () => {
  it('should be a function', () => {
    strictEqual(typeof arrayBufferToReadable, 'function')
  })

  it('should forward the given ArrayBuffer as Buffer object', async () => {
    const arrayBuffer = Uint8Array.from([0, 1, 2, 3]).buffer

    const stream = arrayBufferToReadable(async () => arrayBuffer)
    const result = Buffer.concat(await getStream(stream))

    deepStrictEqual(result, Buffer.from([0, 1, 2, 3]))
  })

  it('should forward errors', async () => {
    const stream = arrayBufferToReadable(async () => {
      throw new Error('test')
    })

    await rejects(async () => {
      await getStream(stream)
    })
  })
})
