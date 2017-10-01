'use strict';
const test = require('tape');
const exec = require('child_process').exec;

test('it can use tape', assert => {
  spawnDuctTape(
    output => {
      assert.equal(
        output.error,
        null,
        "shouldn't throw errors when using tape"
      );
      assert.equal(output.stderr, '', 'stderr should be empty');
      assert.notEqual(output.stdout, '');
      assert.end();
    },
    ['./test/fixtures/tape.js']
  );
});

test('it can use duct-tape', assert => {
  spawnDuctTape(
    output => {
      assert.equal(
        output.error,
        null,
        "shouldn't throw errors when using duct-tape"
      );
      assert.equal(output.stderr, '', 'stderr should be empty');
      assert.notEqual(output.stdout, '');
      assert.end();
    },
    ['./test/fixtures/duct-tape.js']
  );
});

test('it has tap output', assert => {
  spawnDuctTape(output => {
    assert.equal(output.error, null, "shouldn't throw errors when using the cli");
    assert.equal(output.stderr, '', 'stderr should be empty');
    assert.equal(output.stdout, `TAP version 13
# bar
ok 1 should be falsy
# foo
ok 2 should be truthy

1..2
# tests 2
# pass  2

# ok

`, 'should have output');
    assert.end();
  }, './test/fixtures/output/*.js');
});

test('it has formatted tap output', assert => {
  spawnDuctTape(
    output => {
      assert.equal(
        output.error,
        null,
        "shouldn't throw errors when piping a tap reporter using the cli"
      );
      assert.equal(output.stderr, '', 'stderr should be empty');
      assert.equal(
        output.stdout,
        '{"stats":{"asserts":2,"passes":2,"failures":0},"asserts":[{"number":1,"comment":"bar","name":"should be falsy","ok":true,"extra":{}},{"number":2,"comment":"foo","name":"should be truthy","ok":true,"extra":{}}]}\r\n',
        'should output the tap results using a reporter'
      );
      assert.end();
    },
    ['./test/fixtures/output/*.js', '| tap-json']
  );
});

test('it transpiles', assert => {
  spawnDuctTape(
    output => {
      assert.equal(
        output.error,
        null,
        "shouldn't throw errors when transpiling"
      );
      assert.equal(output.stderr, '', 'stderr should be empty');
      assert.notEqual(output.stdout, '');
      assert.end();
    },
    ['./test/fixtures/transpile/*.js']
  );
});

function spawnDuctTape(cb, args) {
  const argsString = [].concat(args).join(' ');
  const prefix = process.platform === 'win32' ? 'node ' : '';
  const pid = exec(
    `${prefix}./bin/duct-tape ${argsString}`,
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
