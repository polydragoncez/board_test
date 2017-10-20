const validate = require('../src/validate')
const assert = require('chai').assert

describe('email', () => {
  it('email should specific format', () => {
    assert(validate.validate_email('dragon.chen@104.com.tw'))
  })
})
