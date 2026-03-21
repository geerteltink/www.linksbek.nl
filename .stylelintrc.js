export default {
  extends: ['stylelint-config-recommended', 'stylelint-config-recess-order'],

  plugins: ['stylelint-order'],

  rules: {
    'max-nesting-depth': 2,
  },
};
