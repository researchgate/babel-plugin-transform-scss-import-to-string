# babel-plugin-transform-scss-import-to-string

<a href="https://travis-ci.org/researchgate/babel-plugin-transform-scss-import-to-string"><img alt="Build Status" src="https://travis-ci.org/researchgate/babel-plugin-transform-scss-import-to-string.svg?branch=master"></a>
<a href="https://codecov.io/gh/researchgate/babel-plugin-transform-scss-import-to-string"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/researchgate/babel-plugin-transform-scss-import-to-string.svg"></a>
<a href="https://greenkeeper.io/"><img alt="Greenkeeper badge" src="https://badges.greenkeeper.io/researchgate/babel-plugin-transform-scss-import-to-string.svg"></a>
<a href="https://www.npmjs.com/package/@researchgate/babel-plugin-transform-scss-import-to-string"><img alt="NPM version" src="https://img.shields.io/npm/v/@researchgate/babel-plugin-transform-scss-import-to-string.svg"></a>

Babel transform plugin for replacing \*.scss imports with static variable
declaration as css string.

## Example

```js
import sideEffectStyles from './styles.sass';
// vvv
const sideEffectStyles = '.foo { color: red; }';
```

## Quick start

Install the plugin first:

```sh
# yarn
yarn add --dev @researchgate/babel-plugin-transform-scss-import-to-string

# npm
npm install --save-dev @researchgate/babel-plugin-transform-scss-import-to-string
```

Add it to your babel configuration:

```json
{
  "plugins": ["@researchgate/babel-plugin-transform-scss-import-to-string"]
}
```

Or with custom [`node-sass` options](https://github.com/sass/node-sass#options):

```json
{
  "plugins": [
    [
      "@researchgate/babel-plugin-transform-scss-import-to-string",
      { "precision": 3 }
    ]
  ]
}
```

Import \*.scss files:

```scss
// foo.scss
$bar: 42px;
.foo {
  font-size: $bar;
}
```

```js
// foo.js
import foo from './foo.scss';
console.log(foo); // -> .foo { font-size: 42px; }
```

## Requirements

- `node-sass`, which you should install explicitly
- `babel-core`, which you should already have with babel configured

## Caveats

- This module shouldn't be used with webpack and sass-loader since babel
  transform would take first place in build process.
- Every import transpiled with node-sass as an independent file, so you have to
  explicitly import dependencies if you used to have common context before.
