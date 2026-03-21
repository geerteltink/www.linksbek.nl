import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const meta = JSON.parse(
  fs.readFileSync(path.join(__dirname, './meta.json'), 'utf-8'),
);

export default {
  summary: (data) => {
    if (data.description) {
      return data.description;
    }

    if (data.tags === undefined) {
      return meta.description;
    }

    if (!data.tags.includes('post')) {
      return meta.description;
    }

    return null;
  },
};
