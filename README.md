# nodeify-fetch

The `nodeify-fetch` packages provides a node stream interface for [fetch](https://fetch.spec.whatwg.org/).
It's based on `isomorphic-fetch` for node and browser support.

## Usage

The `.getReadable` method of `response.body` returns the readable stream:

    const fetch = require('nodeify-fetch')
    
    fetch('url').then((response) => { 
      let stream = response.body.getReadable()
      
      stream.on('data', (chunk) => {
        ...
      })

      stream.on('end', () => {
        ...
      })
    })