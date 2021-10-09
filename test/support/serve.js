import delay from 'promise-the-world/delay.js'
import withServer from './server.js'

async function main () {
  await withServer(async server => {
    console.log(await server.listen(8080))

    await delay(1 << 30)
  })
}

main()
