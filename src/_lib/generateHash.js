import fs from 'fs';
import glob from 'fast-glob';
import md5 from 'md5';

export function generateHash(source) {
  if (process.env.NODE_ENV !== 'production') {
    return 'dev';
  }

  const files = glob.sync(source);
  const content = files.map((file) => fs.readFileSync(file)).join('');
  return md5(content).slice(0, 8);
}

export default generateHash;
