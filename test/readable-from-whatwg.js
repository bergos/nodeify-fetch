/* global describe, it */

var assert = require('assert')
var ReadableFromWhatwg = require('../lib/readable-from-whatwg')

describe('ReadableFromWhatwg', function () {
  it('should be a constructor', function () {
    assert.equal(typeof ReadableFromWhatwg, 'function')
  })

  it('should emit an end event', function () {
    var whatwg = {
      read: function () {
        return Promise.resolve({done: true})
      }
    }

    var readable = new ReadableFromWhatwg(whatwg)

    return new Promise(function (resolve) {
      readable.resume()
      readable.on('end', resolve)
    })
  })

  it('should emit an data event for each chunk', function () {
    var counter = 3

    var whatwg = {
      read: function () {
        if (counter > 0) {
          return Promise.resolve({value: 'test'})
        } else {
          return Promise.resolve({done: true})
        }
      }
    }

    var readable = new ReadableFromWhatwg(whatwg)

    return new Promise(function (resolve) {
      readable.on('data', function (chunk) {
        assert.equal(chunk, 'test')

        counter--
      })
      readable.on('end', resolve)
    })
  })

  it('should emit an error event if the read Promise rejects', function () {
    var whatwg = {
      read: function () {
        return Promise.reject(new Error('test'))
      }
    }

    var readable = new ReadableFromWhatwg(whatwg)

    return new Promise(function (resolve) {
      readable.resume()
      readable.on('error', function (err) {
        assert.equal(err.message, 'test')

        resolve()
      })
    })
  })
})
