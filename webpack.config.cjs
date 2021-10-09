const glob = require('glob')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  entry: {
    main: {
      import: ['./test/support/browser-boot.js']
        .concat(glob.sync('./test/*.js'))
    }
  },
  plugins: [new NodePolyfillPlugin()]
}
