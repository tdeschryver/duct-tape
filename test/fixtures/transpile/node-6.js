'use strict';
import test from 'tape';

test('setting defaults for function parameters', assert => {
  assert.doesNotThrow(() => {
    function multiply(a, b = 2) {
      return a * b;
    }
    multiply(5);
  }, 'should not throw when using default function parameters');
  assert.end();
});

test('object destructuring', assert => {
  const person = { name: 'bob', foo: 'bar' };
  assert.doesNotThrow(() => {
    const { name, foo } = person; // eslint-disable-line no-unused-vars
  }, 'should not throw when using object destructuring');
  assert.end();
});

test('array.includes()', assert => {
  const arr = [10, 20, 30];
  assert.doesNotThrow(() => {
    arr.includes(20);
  }, 'should not throw when using array.includes()');
  assert.end();
});
