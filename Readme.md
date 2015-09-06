# array-generators

Array methods (forEach, forEachSeries, map, filter) with support for generator functions.

### Installation

```
$ npm install array-generators --save
```

### Usage

```javascript
let array = require('array-generators');

let forEach = array.forEach;
let filter = array.filter;
let map = array.map;

let arr = ['first', 'second', 'third'];


/* forEach (async) */
yield forEach(arr, function * (item, index) {
	// item is value, e.g. 'first'
	// index is, well, index, e.g. 0
});


/* forEachSeries (serially) */
yield forEachSeries(arr, function * (item, index) {
  // same as forEach()
});

/* filter */
let result = yield filter(arr, function * (item, index) {
	// return true or false
});


/* map */
let result = yield map(arr, function * (item, index) {
	// return value
});
```

### Tests

[![Circle CI](https://circleci.com/gh/vdemedes/array-generators.svg?style=svg)](https://circleci.com/gh/vdemedes/array-generators)

Run tests using:

```
$ npm test
```

### License

MIT © [Vadym Demedes](http://vadimdemedes.com)
