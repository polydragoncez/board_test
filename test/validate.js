const validate = require('../src/validate')
const assert = require('chai').assert

describe('validate', () => {
  describe('email', () => {
    it('email should specific format', () => {
      assert(validate.validate_email('dragon.chen@104.com.tw'))
      assert(validate.validate_email('gooole@gooole.com'))
      assert(!validate.validate_email(''))
    })
  })
  describe('time', () => {
    it('time should specific format', () => {
      assert(validate.validate_time('Fri Oct 20 2017 15:42:35 GMT+0800 (CST)'))
      assert(!validate.validate_time('!!!'))
      assert(!validate.validate_time('@@@'))
    })
  })
})
