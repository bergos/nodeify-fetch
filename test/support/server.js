var Promise = require('bluebird')
var express = require('express')
var path = require('path')

var app = express()

app.use(express.static(path.join(__dirname, '../../.build/browser-test')))

app.get('/plain-text', function (req, res) {
  res.send('text')
})

function init () {
  return new Promise(function (resolve, reject) {
    app.listen(8081, 'localhost', function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(app)
      }
    })
  })
}

init().then(function () {
  console.log('http://localhost:8081/')
}).catch(function (err) {
  console.error(err.stack || err.message)
})

module.exports = init
