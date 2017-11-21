const { resolve, dirname } = require('path');
const { readFileSync } = require('fs');
const { renderSync } = require('node-sass');

const isImportDefaultSpecifier = node => node.type === 'ImportDefaultSpecifier';

/**
 * This babel plugin transpiles scss import declaration with *.scss mask and
 * replaces it with const variable declaration with raw css string
 */
function transformScssToString(babel) {
  const { types: t } = babel;
  return {
    name: 'babel-plugin-transform-scss-import-to-string',
    visitor: {
      ImportDeclaration(path, { file: { opts: { filename } } }) {
        // Filter *.scss imports
        if (!/\.scss$/.test(path.node.source.value)) return;
        // Get full path to file and transpile it
        const fullScssFilePath = resolve(
          dirname(filename),
          path.node.source.value
        );
        const rawScssContent = readFileSync(fullScssFilePath).toString();
        const sassResult = renderSync({
          data: rawScssContent,
          sourceMap: false,
        });
        const transpiledContent = sassResult.css.toString() || '';
        // Extract import name
        const defaultImportNode = path.node.specifiers.find(
          isImportDefaultSpecifier
        );
        if (!defaultImportNode) return;
        const defaultImportName = defaultImportNode.local.name;
        // Replace import with hardcoded value
        path.replaceWith(
          t.variableDeclaration('const', [
            t.variableDeclarator(
              t.identifier(defaultImportName),
              t.stringLiteral(transpiledContent)
            ),
          ])
        );
      },
    },
  };
}

module.exports = transformScssToString;
