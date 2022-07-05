const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const generateHash = require('../_includes/lib/generateHash');

module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, '../_includes/css/styles.css');
    const hash = generateHash(path.join(__dirname, '../_includes/css/**/*.css'));

    return {
      permalink: `assets/css/styles.${hash}.css`,
      rawFilepath,
      rawCss: fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([
      require('postcss-import'),
      require('cssnano')
    ])
    .process(rawCss, { from: rawFilepath })
    .then((result) => result.css);
  }
};
