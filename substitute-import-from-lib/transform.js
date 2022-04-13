module.exports = function (file, api) {
    const j = api.jscodeshift;
    const source = j(file.source);
  
    const specifiers = source
      .find(j.ImportSpecifier)
      .filter((path) => path.parent.value.source.value === "react-query")
      .filter((path) => path.value.imported.name === "queryCache")
      .remove();
  
    if (specifiers.length) {
      source
        .find(j.ImportDeclaration)
        .filter((path) => path.value.source.value === "react-query")
        .insertAfter(
          j.importDeclaration(
            [
              j.importSpecifier(
                j.identifier("queryClient"),
                j.identifier("queryCache")
              ),
            ],
            j.stringLiteral("common/queryClient")
          )
        );
    }
  
    return source.toSource();
  };