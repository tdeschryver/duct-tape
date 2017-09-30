'use strict';
const test = require('tape');

test('async/await', assert => {
  assert.doesNotThrow(() => {
    foo();

    async function foo() {
      const b = await bar();
      return `foo${b}`;
    }

    async function bar() {
      return 'bar';
    }
  }, 'should not throw when async/await');
  assert.end();
});
