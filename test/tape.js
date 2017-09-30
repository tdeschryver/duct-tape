'use strict';
const test = require('tape');
const ductTape = require('../src/');

test('it has the same API as tape', assert => {
  assert.deepEqual(test, ductTape, "duct-tape should use Tape's API");
  assert.end();
});
