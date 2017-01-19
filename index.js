const findComponentPrefixes = require('./lib/findComponentPrefixes');
const rules = {
  // Config stylelint-config-sass-guidelines comes /w value 1
  // This value is too restrictive.
  'max-nesting-depth': 2,

  // Config stylelint-config-sass-guidelines comes /w no detail configuration
  // We want attribute qualification (i.e. `input[type='text']`) to be allowed
  'selector-no-qualifying-type': [true, {
    ignore: [
      'attribute',
    ],
  }],

  'order/declaration-block-order': [
    'dollar-variables',
    'custom-properties',

    {
      type: 'at-rule',
      name: 'include',
    },
    {
      type: 'at-rule',
      name: 'include',
      hasBlock: true,
    },
    {
      type: 'at-rule',
      hasBlock: true,
    },

    'declarations',
    'rules',

    {
      type: 'at-rule',
      name: 'extends',
    },

    {
      type: 'at-rule',
    },
  ],
};

const componentPrefixes = findComponentPrefixes();

// Add component prefixes to allowed selectors if there are any
if (componentPrefixes.length) {
  const rule = 'selector-type-no-unknown';

  const [
    level,
    config,
  ] = (rules[rule] || [true]);

  rules[rule] = [level, Object.assign({}, config, {
    ignoreTypes: [
      ...(
        config ?
          config.ignoreTypes :
          []
      ),
      ...componentPrefixes.map(prefix => `/^${ prefix }-/`),
    ],
  })];
}

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',

    // Config sass-guidelines has alphabetical order.
    // We want order/* rules and smacss to handle order.
    // @see https://github.com/cahamilton/stylelint-config-property-sort-order-smacss
    'stylelint-config-property-sort-order-smacss',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules,
};
