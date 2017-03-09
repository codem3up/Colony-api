var assert = require('chai').assert;
var arbitraryObject = require('../library/BLL/arbitrary.js');

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe('ArbitraryObject', function(){
  describe('#returnOne()', function(){
    it('should return the value 1 when called', function(){
      assert.equal(1, arbitraryObject.returnOne());
    });
  });
});
