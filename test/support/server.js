import { createHash, randomBytes } from 'crypto'
import express from 'express'
import withPlainServer from 'express-as-promise/withServer.js'

async function withServer (callback) {
  await withPlainServer(async server => {
    server.app.use(express.static((new URL('../../.build/', import.meta.url)).pathname))
    server.app.use(express.static((new URL('public', import.meta.url)).pathname))
    server.app.use(express.static((new URL('../../node_modules/mocha', import.meta.url)).pathname))

    server.app.get('/plain-text', (req, res) => res.send('text'))

    server.app.post('/plain-text', express.text({ type: '*/*' }), (req, res) => {
      if (req.body === 'test') {
        res.status(201)
      } else {
        res.status(500)
      }

      res.end()
    })

    server.app.get('/random', (req, res) => {
      const content = randomBytes(1 << 20)
      const hash = createHash('sha256')

      hash.update(content)

      res.set('sha256', hash.digest('hex')).send(content)
    })

    await callback(server)
  })
}

export default withServer
