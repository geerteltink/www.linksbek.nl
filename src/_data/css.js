const path = require('path');
const generateHash = require('../_lib/generateHash');

const hash = generateHash(path.join(__dirname, '../_includes/css/**/*.css'));

module.exports = {
  stylesCss: `/assets/css/styles.${hash}.css`,
};
