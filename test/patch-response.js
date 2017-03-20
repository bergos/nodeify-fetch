/* global describe, it */

var assert = require('assert')
var patchResponse = require('../lib/patch-response')
var Readable = require('stream').Readable

describe('patchResponse', function () {
  // not implemented in Firefix 51
  /* it('should do nothing if there is no body', function () {
    var res = {}

    patchResponse(res)

    assert.equal(typeof res.readable, 'undefined')
  }) */

  it('should use .getReader if available', function () {
    var touched = false

    var res = {
      body: {
        getReader: function () {
          touched = true
        }
      }
    }

    patchResponse(res)

    res.readable()

    assert.equal(touched, true)
  })

  it('should forward body, if it\'s already a readable', function () {
    var stream = new Readable()

    var res = {
      body: stream
    }

    patchResponse(res)

    return res.readable().then(function (readable) {
      assert.equal(stream, readable)
    })
  })

  it('should throw an error if body is already in use', function () {
    var res = {
      body: {},
      bodyUsed: true
    }

    patchResponse(res)

    return new Promise(function (resolve, reject) {
      res.readable().then(function () {
        reject(new Error('no error thrown'))
      }).catch(resolve)
    })
  })

  it('should use .arrayBuffer if there is no stream', function () {
    var touched = false

    var res = {
      body: {},
      arrayBuffer: function () {
        touched = true

        return Promise.resolve('test')
      }
    }

    patchResponse(res)

    return new Promise(function (resolve) {
      res.readable().then(function (readable) {
        readable.on('end', function () {
          assert.equal(touched, true)

          resolve()
        })

        readable.resume()
      })
    })
  })
})
