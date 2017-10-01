'use strict';
const test = require('tape');
const exec = require('child_process').exec;

const cwd = process.cwd();

test('the cli runs', assert => {
  spawnDuctTape(output => {
    assert.equal(output.error, null, "shouldn't throw errors when using the cli");
    assert.equal(output.stdout, `TAP version 13
# duct-tape
ok 1 should be able to use duct-tape
# setting defaults for function parameters
ok 2 should not throw when using default function parameters
# object destructuring
ok 3 should not throw when using object destructuring
# array.includes()
ok 4 should not throw when using array.includes()
# async/await
ok 5 should not throw when async/await
# object rest and spread
ok 6 should not throw when using object rest an spread
# tape
ok 7 should be able to use tape

1..7
# tests 7
# pass  7

# ok

`, 'should output the tap-results');
    assert.end();
  });
});

test('the cli can use a tap-formatter', assert => {
  spawnDuctTape(
    output => {
      assert.equal(
        output.error,
        null,
        "shouldn't throw errors when piping a tap reporter using the cli"
      );
      assert.equal(
        output.stdout,
        '{"stats":{"asserts":7,"passes":7,"failures":0},"asserts":[{"number":1,"comment":"duct-tape","name":"should be able to use duct-tape","ok":true,"extra":{}},{"number":2,"comment":"setting defaults for function parameters","name":"should not throw when using default function parameters","ok":true,"extra":{}},{"number":3,"comment":"object destructuring","name":"should not throw when using object destructuring","ok":true,"extra":{}},{"number":4,"comment":"array.includes()","name":"should not throw when using array.includes()","ok":true,"extra":{}},{"number":5,"comment":"async/await","name":"should not throw when async/await","ok":true,"extra":{}},{"number":6,"comment":"object rest and spread","name":"should not throw when using object rest an spread","ok":true,"extra":{}},{"number":7,"comment":"tape","name":"should be able to use tape","ok":true,"extra":{}}]}\r\n',
        'should output the tap results using a reporter'
      );
      assert.end();
    },
    ['| tap-json']
  );
});

function spawnDuctTape(cb, opts) {
  const args = ['test/fixtures/*.js'].concat(opts).join(' ');
  const pid = exec(
    `node ./bin/duct-tape ${args}`,
    {
      cwd: cwd,
    },
    (error, stdout, stderr) => {
      cb({
        error,
        stdout,
        stderr,
      });
    }
  );

  return pid;
}
