export default function transformer(file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);
  
    const wrapper = j(j.expressionStatement(
          j.callExpression(
            j.functionExpression(
              j.identifier('foo'), [],
              j.blockStatement(root.get().value.program.body)
            ), []), []));
    
    const nodes = root.find(j.ImportDeclaration).nodes();
    root.find(j.ImportDeclaration).remove();
  
    // wraps, but doesn't re-add the import at top-level
    return wrapper.toSource();
    
    // fails
    // return wrapper.find(j.Statement).at(0).insertBefore(nodes).toSource();
    
    // moves it to the beginning, but no wrap
    return root.find(j.Statement).at(0).insertBefore(nodes).toSource();
  }