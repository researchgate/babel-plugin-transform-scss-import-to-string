const path = require('path');
const babel = require('@babel/core');
const plugin = require('./');

const transformFixture = (fixture, options = {}) => {
  const fixturePath = path.resolve(__dirname, '__fixtures__', fixture);
  const { code } = babel.transformFileSync(fixturePath, {
    plugins: [[plugin, options]],
  });
  return code;
};

describe('babel-plugin-transform-scss-import-to-string', () => {
  it('resolves and transpiles scss file', () => {
    expect(transformFixture('sample.js')).toMatchSnapshot();
  });

  it('skips non-default import specifier', () => {
    expect(transformFixture('invalid.js')).toMatchSnapshot();
  });

  it('supports custom node-sass options', () => {
    expect(
      transformFixture('precision.js', { precision: 3 })
    ).toMatchSnapshot();
  });

  it('supports nested scss files', () => {
    expect(() => transformFixture('nested.js')).not.toThrow();
  });
});
