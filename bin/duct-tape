#!/usr/bin/env node
'use strict';
const path = require('path');
const minimist = require('minimist');
const ductTape = require('../src/duct-tape');

const cwd = process.cwd();
const opts = minimist(process.argv.slice(2));

const patterns = opts._.length
  ? opts._.map(p => {
      if (p.startsWith('!')) {
        return `!${path.resolve(cwd, p.substr(1))}`;
      }
      return path.resolve(cwd, p);
    })
  : undefined;

ductTape({ patterns });
