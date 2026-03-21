import path from 'path';
import { fileURLToPath } from 'url';
import generateHash from '../_lib/generateHash.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hash = generateHash(path.join(__dirname, '../assets/css/**/*.css'));

export const stylesCss = `/assets/css/styles.${hash}.css`;
