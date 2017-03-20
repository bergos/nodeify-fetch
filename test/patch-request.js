/* global describe, it */

var assert = require('assert')
var patchRequest = require('../lib/patch-request')
var Readable = require('readable-stream')

describe('patchRequest', function () {
  it('should accept null options', function () {
    return patchRequest()
  })

  it('should ignore the body if it\'s not a stream', function () {
    var body = 'test'

    return patchRequest({body: body}).then(function (options) {
      assert.equal(options.body, body)
    })
  })

  it('should convert a string stream to a string', function () {
    var body = new Readable()
    var content = ['test', '1234']

    body._read = function () {
      this.push(content.shift() || null)
    }

    return patchRequest({body: body}).then(function (options) {
      assert.equal(options.body, 'test1234')
    })
  })

  it('should convert a buffer stream to a string', function () {
    var body = new Readable()
    var content = [new Buffer('test'), new Buffer('1234')]

    body._read = function () {
      this.push(content.shift() || null)
    }

    return patchRequest({body: body}).then(function (options) {
      assert.equal(Buffer.isBuffer(options.body), true)
      assert.deepEqual(options.body, new Buffer('test1234'))
    })
  })
})
