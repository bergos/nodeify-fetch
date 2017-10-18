/* global describe, it */

const assert = require('assert')
const patchRequest = require('../lib/patchRequest')
const Readable = require('readable-stream')

describe('patchRequest', () => {
  it('should accept null options', () => {
    return patchRequest()
  })

  it('should ignore the body if it\'s not a stream', () => {
    const body = 'test'

    return patchRequest({body: body}).then((options) => {
      assert.equal(options.body, body)
    })
  })

  it('should convert a string stream to a string', () => {
    const body = new Readable()
    const content = ['test', '1234']

    body._read = () => {
      body.push(content.shift() || null)
    }

    return patchRequest({body: body}).then((options) => {
      assert.equal(options.body, 'test1234')
    })
  })

  it('should convert a buffer stream to a string', () => {
    const body = new Readable()
    const content = [Buffer.from('test'), Buffer.from('1234')]

    body._read = function () {
      body.push(content.shift() || null)
    }

    return patchRequest({body: body}).then((options) => {
      assert.equal(Buffer.isBuffer(options.body), true)
      assert.deepEqual(options.body, Buffer.from('test1234'))
    })
  })
})
