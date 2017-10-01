'use strict';
require('babel-register')({
  presets: [
    [
      'env',
      {
        targets: { node: 'current' },
        useBuiltIns: true,
      },
    ],
  ],
  plugins: [['transform-object-rest-spread', { useBuiltIns: true }]],
});

const globby = require('globby');

const ductTape = (
  {
    patterns = [
      `${process.cwd()}/test/**/*.js`,
      `!${process.cwd()}/test/fixtures/**/*.js`,
      `${process.cwd()}/tests/**/*.js`,
      `!${process.cwd()}/tests/fixtures/**/*.js`,
    ],
  } = {}
) => {
  globby(patterns).then(paths => {
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
};

module.exports = ductTape;
