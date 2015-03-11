'use strict';

/**
 * Dependencies
 */

var array = require('./');

var forEach = array.forEach;
var filter = array.filter;
var map = array.map;

require('mocha-generators')();
require('chai').should();


/**
 * Tests
 */

describe ('array-generators', function () {
  it ('forEach', function * () {
    var arr = [1, 2, 3];
    var context = { key: 'value' };
    
    var t = 0;
    var n = 1;
    var i = 0;
    
    yield forEach(arr, function * (item, index) {
      this.should.equal(context);
      item.should.equal(n++);
      index.should.equal(i++);
      t++;
    }, context);
    
    t.should.equal(3);
  });
  
  it ('filter', function * () {
    var arr = [1, 2, 3];
    var context = { key: 'value' };
    
    var t = 0;
    var n = 1;
    var i = 0;
    
    var result = yield filter(arr, function * (item, index) {
      this.should.equal(context);
      item.should.equal(n++);
      index.should.equal(i++);
      t++;
      
      return item == 1;
    }, context);
    
    t.should.equal(3);
    result.length.should.equal(1);
    result[0].should.equal(1);
  });
  
  it ('map', function * () {
    var arr = [1, 2, 3];
    var context = { key: 'value' };
    
    var t = 0;
    var n = 1;
    var i = 0;
    
    var result = yield map(arr, function * (item, index) {
      this.should.equal(context);
      item.should.equal(n++);
      index.should.equal(i++);
      t++;
      
      return item * item;
    }, context);
    
    t.should.equal(3);
    result.length.should.equal(3);
    result[0].should.equal(1);
    result[1].should.equal(4);
    result[2].should.equal(9);
  });
});
