# array-generators

Array methods (forEach, map, filter) with support for generator functions.

### Installation

```
$ npm install array-generators --save
```

### Usage

```javascript
var array = require('array-generators');

var forEach = array.forEach;
var filter = array.filter;
var map = array.map;

var arr = ['first', 'second', 'third'];


/* forEach */
yield forEach(arr, function * (item, index) {
	// item is value, e.g. 'first'
	// index is, well, index, e.g. 0
});


/* filter */
var result = yield filter(arr, function * (item, index) {
	// return true or false
});


/* map */
var result = yield map(arr, function * (item, index) {
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

WTFPL – Do What the Fuck You Want to Public License
