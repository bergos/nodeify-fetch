'use strict'

/* global describe, it */

var assert = require('assert')
var fetch = require('..')

describe('fetch', function () {
  it('response should have a .getReadable method', function () {
    return fetch('http://localhost:8081/plain-text').then(function (response) {
      assert.equal(typeof response.body.getReadable, 'function')
    })
  })

  it('response method .getReadable should return a readable stream', function () {
    return fetch('http://localhost:8081/plain-text').then(function (response) {
      var readable = response.body.getReadable()

      return new Promise(function (resolve) {
        var content = ''

        readable.on('end', function () {
          assert.equal(content, 'text')

          resolve()
        })

        readable.on('data', function (chunk) {
          content += chunk
        })
      })
    })
  })
})
