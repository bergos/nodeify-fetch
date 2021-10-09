import { strictEqual } from 'assert'
import { createHash } from 'crypto'
import { describe, it } from 'mocha'
import { Readable } from 'readable-stream'
import fetch from '../index.js'
import getStream from '../lib/getStream.js'
import withServer from './support/server.js'

describe('fetch', () => {
  describe('request', () => {
    it('should support a plain string body', async () => {
      await withServer(async server => {
        const response = await fetch(new URL('plain-text', await server.listen()), {
          method: 'POST',
          body: 'test'
        })

        strictEqual(response.status, 201)
      })
    })

    it('should support a readable stream body', async () => {
      await withServer(async server => {
        const stream = new Readable({
          read: () => {
            stream.push('test')
            stream.push(null)
          }
        })

        const response = await fetch(new URL('plain-text', await server.listen()), {
          method: 'POST',
          headers: {
            'content-type': 'text/plain'
          },
          body: stream
        })

        strictEqual(response.status, 201)
      })
    })
  })

  describe('response', () => {
    it('should have a body that is a stream', async () => {
      await withServer(async server => {
        const response = await fetch(new URL('plain-text', await server.listen()))

        strictEqual(typeof response.body, 'object')
        strictEqual(response.body.readable, true)
      })
    })

    it('should have a body that forwards the content', async () => {
      await withServer(async server => {
        const response = await fetch(new URL('plain-text', await server.listen()))

        const content = Buffer.concat(await getStream(response.body))

        strictEqual(content.toString(), 'text')
      })
    })

    it('should have a body with the correct content', async () => {
      await withServer(async server => {
        const response = await fetch(new URL('random', await server.listen()))

        const sum = response.headers.get('sha256')
        const content = await getStream(response.body)

        const hash = createHash('sha256')

        for (const chunk of content) {
          hash.update(chunk)
        }

        strictEqual(hash.digest('hex'), sum)
      })
    })
  })
})
