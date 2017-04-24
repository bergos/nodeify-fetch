# nodeify-fetch

The `nodeify-fetch` packages provides a node stream interface for [fetch](https://fetch.spec.whatwg.org/).
It's based on `isomorphic-fetch` for node and browser support.

## Usage

The `.readable` method returns the readable stream as Promise:

    const fetch = require('nodeify-fetch')
    
    fetch('url').then(response) => {
      return response.readable()
    }).then((stream) => {
      stream.on('data', (chunk) => {
        ...
      })

      stream.on('end', () => {
        ...
      })
    })
