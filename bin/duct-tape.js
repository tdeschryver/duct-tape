#!/usr/bin/env node
'use strict';
const path = require('path');
const minimist = require('minimist');
const ductTape = require('../src/duct-tape');

const cwd = process.cwd();
const opts = minimist(process.argv.slice(2));

let options = {};
if (opts._.length) {
  options.patterns = opts._.map(p => {
    if (p.startsWith('!')) {
      return `!${path.resolve(cwd, p.substr(1))}`;
    }
    return path.resolve(cwd, p);
  });
}

ductTape(options);
