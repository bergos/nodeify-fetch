import getStream from './getStream.js'

async function patch (options = {}) {
  if (!options.body || !options.body.readable) {
    return options
  }

  // read the whole input stream...
  const content = await getStream(options.body)

  // ...and if there is any content convert it to a single Buffer or string
  if (content.length > 0) {
    if (Buffer.isBuffer(content[0])) {
      options.body = Buffer.concat(content)
    } else {
      options.body = content.join('')
    }
  } else {
    options.body = ''
  }

  return options
}

export default patch
