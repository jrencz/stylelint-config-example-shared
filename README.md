# stylelint-config-example-shared [![Build Status][ci-img]][ci]

Example Stylelint shared configuration meant for Sass projects using Scss syntax

## Installation

Add `"stylelint-config-example-shared": "github:jrencz/stylelint-config-example-shared"`
to your package.json (this is not published to NPM and it will probably never be
since it's meant to be an example)

## Usage

```json
{
  "extends": "stylelint-config-example-shared"
}
```

## 3rd party goodies bundled in this config

### Shared configurations

This config extends the following well known configurations:

- [`stylelint-config-standard`](https://www.npmjs.com/package/stylelint-config-standard) - rules about CSS in general
- [`stylelint-config-sass-guidelines`](https://www.npmjs.com/package/stylelint-config-sass-guidelines) - rules Sass using Scss syntax according to [Sass Guidelines](https://sass-guidelin.es)
- [`stylelint-config-property-sort-order-smacss`](https://www.npmjs.com/package/stylelint-config-property-sort-order-smacss) - rules enforcing order of CSS property declarations according to [SMACSS Methodology](https://smacss.com)

### Plugins

It also provides block group ordering using rules from [`stylelint-order`](https://www.npmjs.com/package/stylelint-order)
to ensure that:
- variables are always before declarations
- includes are always before declarations
- extends are always at the bottom, just before other at-rules

## Own features

### Rules

Some rules from extended configurations are reconfigured in this config. Check
[index.js](./index.js) for details.

### In-project Configuration

This config allows custom element selectors starting with a prefix defined in
project's `package.json` on path `config.componentPrefix` defined as a string:

```json
{
  "config": {
    "componentPrefix": "my"
  }
}
```

which makes selectors like `my-fancy-component` valid without a need to express
it in project's `.stylelintrc` file.

Array of strings syntax is also accepted:


```json
{
  "config": {
    "componentPrefix": [
      "my",
      "other"
    ]
  }
}
```

now both `my-fancy-component` and `other-fancy-component` are valid.
