const Promise = require('bluebird')
const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '../../.build/')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.dirname(require.resolve('mocha'))))

app.get('/plain-text', (req, res) => {
  res.send('text')
})

function init () {
  return Promise.promisify(app.listen, {context: app})(8081, 'localhost')
}

init().then(function () {
  console.log('http://localhost:8081/')
}).catch(function (err) {
  console.error(err.stack || err.message)
})

module.exports = init
