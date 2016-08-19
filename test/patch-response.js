'use strict'

/* global describe, it */

var assert = require('assert')
var patchResponse = require('../lib/patch-response')
var Readable = require('stream').Readable

describe('patchResponse', function () {
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

    res.body.getReadable()

    assert.equal(touched, true)
  })

  it('should forward body, if it\'s already a readable', function () {
    var readable = new Readable()

    var res = {
      body: readable
    }

    patchResponse(res)

    assert.equal(res.body.getReadable(), readable)
  })

  it('should use .arrayBuffer if there is no stream', function () {
    var touched = false

    var res = {
      arrayBuffer: function () {
        touched = true

        return Promise.resolve('test')
      }
    }

    patchResponse(res)

    return new Promise(function (resolve) {
      res.body.getReadable().on('end', function () {
        assert.equal(touched, true)

        resolve()
      }).resume()
    })
  })
})
