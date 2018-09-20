const { resolve, dirname, join } = require('path');
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
      ImportDeclaration(path, state) {
        // Drop these options
        const userOptions = state.opts;
        delete userOptions.file;
        delete userOptions.data;
        // Filter *.scss imports
        if (!/\.scss$/.test(path.node.source.value)) return;
        // Get full path to file and transpile it
        const scssFileDirectory = resolve(dirname(state.file.opts.filename));
        const fullScssFilePath = join(
          scssFileDirectory,
          path.node.source.value
        );
        const projectRoot = process.cwd();
        const nodeModulesPath = join(projectRoot, 'node_modules');
        const sassDefaults = {
          file: fullScssFilePath,
          sourceMap: false,
          includePaths: [nodeModulesPath, scssFileDirectory, projectRoot],
        };
        const sassResult = renderSync(
          Object.assign({}, sassDefaults, userOptions)
        );
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
