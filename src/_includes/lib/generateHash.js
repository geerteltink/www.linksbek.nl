const fs = require('fs');
const glob = require('fast-glob');
const md5 = require('md5');

function generateHash(source) {
  const files = glob.sync(source);
  const content = files
    .map((file) => fs.readFileSync(file))
    .join('');
  return md5(content).slice(0, 8);
}

module.exports = generateHash;
