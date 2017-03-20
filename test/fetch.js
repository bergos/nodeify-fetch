/* global describe, it */

var assert = require('assert')
var fetch = require('..')

describe('fetch', function () {
  it('response should have a .readable method', function () {
    return fetch('http://localhost:8081/plain-text').then(function (response) {
      assert.equal(typeof response.readable, 'function')
    })
  })

  it('response method .readable should return a readable stream', function () {
    return fetch('http://localhost:8081/plain-text').then(function (response) {
      return response.readable().then(function (readable) {
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
})
