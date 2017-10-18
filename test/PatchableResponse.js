/* global describe, it */

const assert = require('assert')
const PatchableResponse = require('../lib/PatchableResponse')

describe('PatchableResponse', () => {
  it('should be a constructor', () => {
    assert.equal(typeof PatchableResponse, 'function')
  })

  it('should wrap methods of the object', () => {
    let touched = false

    class Test {
      test () {
        touched = true
      }
    }

    const obj = new Test()
    const res = new PatchableResponse(obj, {})

    res.test()

    assert.notEqual(res.test, obj.test)
    assert(touched)
  })

  it('should wrap properties of the object', () => {
    let value = 'initial'

    class Test {
      get test () {
        return value
      }

      set test (v) {
        value = v
      }
    }

    const obj = new Test()
    const res = new PatchableResponse(obj, {})

    assert.equal(res.test, 'initial')

    res.test = 'changed'

    assert.equal(res.test, 'changed')
  })

  it('should use patched properties and methods', () => {
    class Test {
      get property () {
        return 'test'
      }

      method () {
        return 'test'
      }
    }

    const method = () => {
      return 'patched'
    }

    const obj = new Test()
    const res = new PatchableResponse(obj, {
      property: 'patched',
      method: method
    })

    assert.equal(res.property, 'patched')
    assert.equal(res.method(), 'patched')
  })

  it('.properties should list all properties of the class', () => {
    class Test {
      test0 () {}
      test1 () {}
    }

    const properties = PatchableResponse.properties(new Test())

    assert.deepEqual(properties, ['constructor', 'test0', 'test1'])
  })
})
