export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let main = options.main || 'main';

  const wrapper = j(
    j.program([
      j.expressionStatement(
        j.callExpression(
          j.functionExpression(
            j.identifier(main),
            [],
            j.blockStatement(root.get().value.program.body)
          ),
          []
        ),
        []
      )
    ])
  );

  const imports = root.find(j.ImportDeclaration);
  const importNodes = imports.nodes();
  imports.remove();
  return wrapper
            .find(j.Statement).at(0)   // get the first statement
            .insertBefore(importNodes) // insert the imports before the first statement
            .toSource();
}