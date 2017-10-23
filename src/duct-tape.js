'use strict';
require('babel-register')({
  presets: [
    [
      'env',
      {
        targets: { node: 'current' },
        plugins: ['transform-object-rest-spread'],
      },
    ],
  ],
});

const globby = require('globby');

function ductTape(opts) {
  const options = Object.assign(
    {},
    {
      patterns: [
        `${process.cwd()}/test/**/*.js`,
        `!${process.cwd()}/test/fixtures/**/*.js`,
        `${process.cwd()}/tests/**/*.js`,
        `!${process.cwd()}/tests/fixtures/**/*.js`,
      ],
    },
    opts
  );

  globby(options.patterns).then(paths => {
    paths.forEach(file => {
      try {
        require(file);
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          console.log(`Sorry but the file '${file}' couldn't be found.`);
        } else {
          console.log(err);
        }
      }
    });
  });
}

module.exports = ductTape;
