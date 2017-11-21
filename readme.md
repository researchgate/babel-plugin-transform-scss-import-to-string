# `babel-plugin-transform-scss-import-to-string`
Babel transform plugin for replacing *.scss imports with static variable
declaration as css string.

## Example
```js
import sideEffectStyles from './styles.sass';
// vvv
const sideEffectStyles = '.foo { color: red; }';
```

## Quick start
Install the plugin first:
```
npm install --save-dev @researchgate/babel-plugin-transform-scss-import-to-string
```

Add it to your babel configuration:
```js
{
  "plugins": [
    "@researchgate/babel-plugin-transform-scss-import-to-string"
  ]
}
```

Import *.scss files:
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
* `node-sass`, which you should install explicitly
* `babel-core`, which you should already have with babel configured

## Caveats
- This module shouldn't be used with webpack and sass-loader since babel
transform would take first place in build process.
- Every import transpiled with node-sass as an independent file, so you have to
explicitly import dependencies if you used to have common context before.
