import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import generateHash from '../_lib/generateHash.js';
import postcssImport from 'postcss-import';
import cssnano from 'cssnano';

export default class {
  async data() {
    const rawFilepath = path.join(
      path.dirname(import.meta.url.replace('file://', '')),
      '../assets/css/styles.css',
    );
    const hash = generateHash(
      path.join(
        path.dirname(import.meta.url.replace('file://', '')),
        '../assets/css/**/*.css',
      ),
    );

    return {
      permalink: `assets/css/styles.${hash}.css`,
      rawFilepath,
      rawCss: fs.readFileSync(rawFilepath),
      eleventyExcludeFromCollections: true,
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([postcssImport, cssnano])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
}
