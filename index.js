'use strict';

/**
 * Dependencies
 */

var compose = require('koa-compose');


/**
 * Expose functions
 */

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

function * forEach (arr, fn, context) {
  var fns = arr.map(function (item, index) {
    return function * (next) {
      yield fn.call(context, item, index);
      yield next;
    };
  });
  
  yield compose(fns);
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
  
  var fns = arr.map(function (item, index) {
    return function * (next) {
      var isValid = yield fn.call(context, item, index);
      
      if (isValid) result.push(item);
      
      yield next;
    }
  });
  
  yield compose(fns);
  
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

function * map (arr, fn, context) {
  var result = [];
  
  var fns = arr.map(function (item, index) {
    return function * (next) {
      var modifiedItem = yield fn.call(context, item, index);
      
      result.push(modifiedItem);
      
      yield next;
    }
  });
  
  yield compose(fns);
  
  return result;
}
