#!/usr/bin/env node

const version = require('../package.json').version;
const decode = require('./decode');
const encode = require('./encode');
const program = require('commander');

let mode = 0;
let input;

program
.usage('[options] <string> [rest...]')
.version(version)
.option('-e, --encode', 'Encode')
.option('-d, --decode', 'Decode')
.action((string, rest) => {
  input = string;
  mode = (program.encode ^ 0) + (program.decode ^ 0) * 2;
  if (rest.length > 0) {
    console.warn('Use quotes to specify a string');
  }
})
.parse(process.argv);

switch (mode) {
  case 0:
  case 3:
    console.error('Specify either encode or decode');
    process.exit(1);

  case 1: // encode
    console.log(encode(input));
    process.exit(0);

  case 2: // decode
    console.log(decode(input));
    process.exit(0);

  default:
    console.error('Something went wrong');
    process.exit(1);
}
