'use strict';
const test = require('tape');
const spawn = require('child_process').spawn;

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

function spawnDuctTape(cb, args) {
  const pid = spawn(
    'node ./bin/duct-tape',
    ['test/fixtures/*.js'].concat(args),
    {
      cwd: cwd,
      stdio: 'pipe',
      shell: true
    }
  );
  let output = { stdout: '', stderr: '', error: null, code: undefined };

  pid.stdout.on('data', data => {
    output.stdout += data;
  });

  pid.stderr.on('data', data => {
    output.stderr += data;
  });

  pid.on('error', err => {
    output.error = err;
  });

  pid.on('close', code => {
    output.code = code;
    cb(output);
  });

  return pid;
}
