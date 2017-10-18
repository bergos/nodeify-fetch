/* global before, describe, it */

const assert = require('assert')
const fetch = require('..')
const server = require('./support/server')

describe('fetch', () => {
  before(() => {
    if (server.init) {
      return server.init().then(() => {
        server.init = null
      })
    }
  })

  it('response .body should be a stream', () => {
    return fetch('http://localhost:8081/plain-text').then((response) => {
      assert.equal(typeof response.body, 'object')
      assert.equal(response.body.readable, true)
    })
  })

  it('response .body should forward the content', () => {
    return fetch('http://localhost:8081/plain-text').then((response) => {
      return new Promise((resolve) => {
        let content = ''

        response.body.on('end', () => {
          assert.equal(content, 'text')

          resolve()
        })

        response.body.on('data', (chunk) => {
          content += chunk
        })
      })
    })
  })
})
