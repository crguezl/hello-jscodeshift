const generate = require('escodegen').generate;
const esprima = require('esprima');
//const recast = require('recast');
//const union = require('./utils/union');

//const astTypes = recast.types;
//var types = astTypes.namedTypes;
//const NodePath = astTypes.NodePath;
//const Node = types.Node;


module.exports = function(file, api) {
  const j = api.jscodeshift;

  debugger;

  let hello = j.expressionStatement(j.callExpression(
    j.memberExpression(j.identifier("console"), j.identifier("log"), false),
    [j.literal("hello")]
  ));

  return j(file.source)
         .find(j.Function).replaceWith(p => {
              debugger;
             let node = p.value;
             let name = node.id && node.id.name;
             let params = node.params;
             let body = node.body.body;
             let newBody = j.blockStatement([hello].concat(body))
             let newNode = name? j.functionDeclaration(
                j.identifier(name),
                params,
                newBody,
                false,
                false,
                false
              ) 
              : 
              j.functionExpression(
                null,
                params,
                newBody,
                false,
                false
              );
             //console.log(newNode);
             return newNode;
         }).toSource();
 
}
