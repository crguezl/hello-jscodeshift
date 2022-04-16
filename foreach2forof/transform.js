const { generate } = require('escodegen');

module.exports = function(fileInfo, api) {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    let result = root.find(j.CallExpression, {
        callee : {
            property : {
                name : "forEach"
            }
        }
    })
    .replaceWith(path => {
        // Handles foo.forEach() and [1,2].forEach()
        let node = path.value;
        console.log("======generate(node)======\n"+generate(node));

        const expression = node.callee.object.name ? j.identifier(node.callee.object.name) 
                                                : j.arrayExpression(node.callee.object.elements);
        console.log(expression);
        let newNode = j.forOfStatement(
          j.variableDeclaration(
                "const",
                node.arguments[0].params
          ),
          expression,
          node.arguments[0].body
        );

        console.log("***********newNode*******\n"+JSON.stringify(newNode,null, 2)+"\n********************");
        
        return newNode;
    })
    .toSource();

    return result;
}
