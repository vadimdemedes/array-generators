'use strict';

/**
 * Dependencies
 */

var co = require('co');


/**
 * Expose functions
 */

exports.forEachSeries = forEachSeries;
exports.forEach = forEach;
exports.filter = filter;
exports.map = map;


/**
 * Support for generator functions
 */


/**
 * Array#forEach
 *
 * Execute a provided function once per array element.
 *
 * @param {Array} arr - array to iterate
 * @param {Function} fn - iterator function
 * @param {Object) context - optional context for iterator function
 */

function forEach (arr, fn, context) {
  return map.apply(null, arguments);
}


/**
 * Array#forEachSeries
 *
 * Execute functions serially
 *
 * @param {Array} arr - array to iterate
 * @param {Function} fn - iterator function
 * @param {Object} context - optional context for iterator function
 */

function * forEachSeries (arr, fn, context) {
  var i = -1;

  while (arr[++i]) {
    yield fn.call(context, arr[i], i);
  }
}


/**
 * Array#filter
 *
 * Create a new array with all elements
 * that pass the test implemented by the provided function.
 * 
 * @param {Array} arr - array to iterate
 * @param {Function} fn - iterator function
 * @param {Object) context - optional context for iterator function
 */

function * filter (arr, fn, context) {
  var result = [];

  var results = yield map(arr, fn, context);

  results.forEach(function (item, index) {
    if (item) {
      result.push(arr[index]);
    }
  });

  return result;
}


/**
 * Array#map
 *
 * Create a new array with the results of
 * calling a provided function on every element in this array.
 * 
 * @param {Array} arr - array to iterate
 * @param {Function} fn - iterator function
 * @param {Object) context - optional context for iterator function
 */

function map (arr, fn, context) {
  return arr.map(function (item, index) {
    return co(fn.call(context, item, index));
  });
}
