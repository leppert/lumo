/* @flow */

const fs = require('fs');
const zlib = require('zlib');

let nexeres;

if (!__DEV__) {
  // $FlowExpectedError: only exists in the Nexe bundle.
  nexeres = require('nexeres'); // eslint-disable-line
}

function load(path: string): ?string {
  try {
    if (__DEV__) {
      return fs.readFileSync(`./target/${path}`, 'utf8');
    }
    const gzipped = nexeres.get(path);

    return zlib.inflateSync(gzipped);
  } catch (e) {
    return null;
  }
}

module.exports = {
  load,
};