module.exports = function(file, api) {
  const j = api.jscodeshift;

  debugger;

  let hello = j.expressionStatement(
      j.callExpression(
         j.memberExpression(
             j.identifier("console"), 
             j.identifier("log"), 
         false),
        [j.literal("hello")]
    ) // end of callExpression
  );

  let fdt = (name, params, body) => j.functionDeclaration(
        j.identifier(name), params,  body,
        false, false, false
    );

  let fet = (params, body) => j.functionExpression(null, params, body, false, false, false);

        
  return j(file.source)
         .find(j.Function).replaceWith(p => {
            debugger;
            let node = p.value;
            let name = node.id && node.id.name;
            let params = node.params;
            let body = node.body.body;
            let newBody = j.blockStatement([hello].concat(body))
            let newNode = name? fdt(name, params, newBody) 
            : fet(params, newBody);

            //console.log(newNode);
            return newNode;
         }).toSource();
 
}
