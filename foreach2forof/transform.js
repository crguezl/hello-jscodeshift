const { generate } = require('escodegen');

module.exports = function(fileInfo, api) {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);

    root.find(j.CallExpression, {
        callee : {
            property : {
                name : "forEach"
            }
        }
    })
    .replaceWith(path => {
        // Handles foo.forEach() and [1,2].forEach()
        let node = path.value;
        console.log(generate(node));

        const expression = node.callee.object.name ? j.identifier(node.callee.object.name) 
                                                : j.arrayExpression(node.callee.object.elements);
    
        let newNode = j.forOfStatement(
          j.variableDeclaration(
                "const",
                node.arguments[0].params
          ),
          expression,
          node.arguments[0].body
        );

        console.log(generate(newNode));
        
        return newNode;
    })
    .toSource();
}
