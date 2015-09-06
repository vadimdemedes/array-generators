'use strict';

/**
 * Dependencies
 */

const sleep = require('co-sleep');
const array = require('./');

const forEachSeries = array.forEachSeries;
const forEach = array.forEach;
const filter = array.filter;
const map = array.map;

require('mocha-generators')();
require('chai').should();


/**
 * Tests
 */

describe ('array-generators', function () {
  it ('forEach', function * () {
    let arr = [1, 2, 3];
    let context = { key: 'value' };
    
    let t = [];
    let n = 1;
    let i = 0;
    
    yield forEach(arr, function * (item, index) {
      this.should.equal(context);
      item.should.equal(n++);
      index.should.equal(i++);

      yield sleep(Math.random() * 500);

      t.push(item);
    }, context);
    
    t.length.should.equal(3);

    arr.indexOf(t[0]).should.be.above(-1);
    t.splice(0, 1);
    arr.indexOf(t[0]).should.be.above(-1);
    t.splice(0, 1);
    arr.indexOf(t[0]).should.be.above(-1);
  });

  it ('forEachSeries', function * () {
    let arr = [1, 2, 3];
    let context = { key: 'value' };

    let t = [];
    let n = 1;
    let i = 0;

    yield forEachSeries(arr, function * (item, index) {
      this.should.equal(context);
      item.should.equal(n++);
      index.should.equal(i++);

      yield sleep(Math.random() * 500);

      t.push(item);
    }, context);

    t.should.deep.equal(arr);
  });
  
  it ('filter', function * () {
    let arr = [1, 2, 3];
    let context = { key: 'value' };
    
    let t = 0;
    let n = 1;
    let i = 0;
    
    let result = yield filter(arr, function * (item, index) {
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
    let arr = [1, 2, 3];
    let context = { key: 'value' };
    
    let t = 0;
    let n = 1;
    let i = 0;
    
    let result = yield map(arr, function * (item, index) {
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
