import mocha from 'mocha'

mocha.setup('bdd')

// describe and it are available in node, but not in the browser
mocha.describe = window.describe
mocha.it = window.it

mocha.run()
