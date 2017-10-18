/* global describe, it */

const assert = require('assert')
const readableToBuffer = require('../lib/readableToBuffer')
const Readable = require('readable-stream')

describe('readableToBuffer', () => {
  it('should be a function', () => {
    assert.equal(typeof readableToBuffer, 'function')
  })

  it('should concat multiple chunks into a Buffer', () => {
    const readable = new Readable({
      read: () => {
        readable.push(Buffer.from('test'))
        readable.push(Buffer.from('1234'))
        readable.push(null)
      }
    })

    return readableToBuffer(readable).then((buffer) => {
      assert.deepEqual(buffer, Buffer.from('test1234'))
    })
  })
})
