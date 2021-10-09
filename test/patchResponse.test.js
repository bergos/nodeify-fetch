import { strictEqual } from 'assert'
import { describe, it } from 'mocha'
import { Readable } from 'readable-stream'
import getStream from '../lib/getStream.js'
import patchResponse from '../lib/patchResponse.js'
import { toReader } from './support/toWhatwg.js'

describe('patchResponse', () => {
  it('should be a function', () => {
    strictEqual(typeof patchResponse, 'function')
  })

  it('should use WHATWG stream if available', async () => {
    const res = {
      body: toReader('test')
    }

    const patched = patchResponse(res)

    const content = Buffer.concat(await getStream(patched.body))

    strictEqual(content.toString(), 'test')
  })

  it('should forward body, if it\'s already a readable', () => {
    const stream = new Readable()

    let res = {
      body: stream
    }

    res = patchResponse(res)

    strictEqual(stream, res.body)
  })

  it('should emit an error if body is already in use', () => {
    let res = {
      body: {},
      bodyUsed: true
    }

    res = patchResponse(res)

    return new Promise(resolve => {
      res.body.on('error', resolve)

      res.body.resume()
    })
  })

  it('should use .arrayBuffer if there is no stream', () => {
    let touched = false

    let res = {
      body: {},
      arrayBuffer: () => {
        touched = true

        return Promise.resolve('test')
      }
    }

    res = patchResponse(res)

    return new Promise(resolve => {
      res.body.on('end', () => {
        strictEqual(touched, true)

        resolve()
      })

      res.body.resume()
    })
  })
})
