'use strict';

/**
 * Dependencies
 */

const sleep = require('co-sleep');
const array = require('./');
const ava = require('ava');
const co = require('co');

const forEachSeries = array.forEachSeries;
const forEach = array.forEach;
const filter = array.filter;
const map = array.map;


/**
 * Tests
 */

test ('forEach', function * (t) {
  let arr = [1, 2, 3];
  let context = { key: 'value' };

  let r = [];
  let n = 1;
  let i = 0;

  yield forEach(arr, function * (item, index) {
    t.is(this, context);
    t.is(item, n++);
    t.is(index, i++);

    yield sleep(Math.random() * 500);

    r.push(item);
  }, context);

  t.is(r.length, 3);

  t.true(arr.indexOf(r[0]) >= 0);
  r.splice(0, 1);
  t.true(arr.indexOf(r[0]) >= 0);
  r.splice(0, 1);
  t.true(arr.indexOf(r[0]) >= 0);
});

test ('forEachSeries', function * (t) {
  let arr = [1, 2, 3];
  let context = { key: 'value' };

  let r = [];
  let n = 1;
  let i = 0;

  yield forEachSeries(arr, function * (item, index) {
    t.is(this, context);
    t.is(item, n++);
    t.is(index, i++);

    yield sleep(Math.random() * 500);

    r.push(item);
  }, context);

  t.same(r, arr);
});

test ('filter', function * (t) {
  let arr = [1, 2, 3];
  let context = { key: 'value' };

  let n = 1;
  let i = 0;

  let result = yield filter(arr, function * (item, index) {
    t.is(this, context);
    t.is(item, n++);
    t.is(index, i++);

    return item == 1;
  }, context);

  t.same(result, [1]);
});

test ('map', function * (t) {
  let arr = [1, 2, 3];
  let context = { key: 'value' };

  let n = 1;
  let i = 0;

  let result = yield map(arr, function * (item, index) {
    t.is(this, context);
    t.is(item, n++);
    t.is(index, i++);

    return item * item;
  }, context);

  t.same(result, [1, 4, 9]);
});


/**
 * Utilities
 */

function test (title, fn) {
  ava(title, function () {
    return co(fn.apply(null, arguments));
  });
}
