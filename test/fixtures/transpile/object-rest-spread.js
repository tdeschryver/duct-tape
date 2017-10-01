'use strict';
const test = require('tape');

test('object rest and spread', assert => {
  assert.doesNotThrow(() => {
    const foo = { a: 1, b: 2, c: 3 };
    const { a, ...rest } = foo; // eslint-disable-line no-unused-vars
  }, 'should not throw when using object rest an spread');
  assert.end();
});
