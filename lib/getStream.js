async function getStream (stream) {
  const chunks = []

  stream.on('data', chunk => chunks.push(chunk))

  return new Promise((resolve, reject) => {
    stream.on('end', () => resolve(chunks))
    stream.on('error', err => reject(err))
  })
}

export default getStream
