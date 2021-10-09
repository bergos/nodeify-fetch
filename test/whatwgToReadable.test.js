import { deepStrictEqual, rejects, strictEqual } from 'assert'
import { describe, it } from 'mocha'
import delay from 'promise-the-world/delay.js'
import getStream from '../lib/getStream.js'
import whatwgToReadable from '../lib/whatwgToReadable.js'
import { toErrorStream, toStream } from './support/toWhatwg.js'

describe('whatwgToReadable', () => {
  it('should be a function', () => {
    strictEqual(typeof whatwgToReadable, 'function')
  })

  it('should forward the chunks from the WHATWG readable', async () => {
    const stream = whatwgToReadable(toStream(['ab', 'cd']))

    const result = await getStream(stream)

    deepStrictEqual(result, [Buffer.from('ab'), Buffer.from('cd')])
  })

  it('should forward errors from the WHATWG readable', async () => {
    const stream = whatwgToReadable(toErrorStream(new Error('test')))

    await rejects(async () => {
      await getStream(stream)
    })
  })

  it('should respect the highwater mark', async () => {
    const source = toStream(['ab', 'cd'])
    const stream = whatwgToReadable(source)
    stream._readableState.highWaterMark = 1

    stream.read()

    await delay(1)

    strictEqual(source.values.length, 1)
  })
})
