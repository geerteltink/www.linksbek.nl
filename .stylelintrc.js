module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recess-order',
  ],

  plugins: ['stylelint-order'],

  rules: {
    'max-empty-lines': 4,
    'max-nesting-depth': 2,
  },
};
