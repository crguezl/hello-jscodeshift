export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const wrapper = j(
    j.program([
      j.expressionStatement(
        j.callExpression(
          j.functionExpression(
            j.identifier("foo"),
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
  const nodes = imports.nodes();
  imports.remove();
  return wrapper.find(j.Statement).at(0).insertBefore(nodes).toSource();
}