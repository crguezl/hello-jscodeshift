module.exports = function(file, api) {
  const j = api.jscodeshift;

  debugger;

  let messageT = (name) => j.expressionStatement(
      j.callExpression(
         j.memberExpression(
             j.identifier("console"), 
             j.identifier("log"), 
         false),
        [j.literal(`Entering function '${name}'`)]
    ) // end of callExpression
  );

  let funDecT = (name, params, body) => j.functionDeclaration(
        j.identifier(name), params,  body,

    );

  let funExpT = (params, body) => j.functionExpression(null, params, body);
        
  return j(file.source)
         .find(j.Function).replaceWith(p => {
            debugger;
            let node = p.value;
            let name = node.id && node.id.name;
            let params = node.params;
            let body = node.body.body;
            let newBody = j.blockStatement([messageT(name || "anonymous")].concat(body));
            let newNode = name? funDecT(name, params, newBody) : funExpT(params, newBody)
            
            return newNode;
         }).toSource();
}
