module.exports = function (fileInfo, api, options) {
  console.log("hello jscodeshift!");
  debugger;
  console.log("**********************fileInfo**************************");
  console.log(fileInfo);
  let j = api.jscodeshift;
  let jscColl = j(fileInfo.source);
  console.log("************* jscColl = j(fileInfo.source) *****************");
  console.log(jscColl);
  let callExpAST = j.CallExpression; // Build a CallExpression AST node
  console.log("************* callExpAST = j.CallExpression *****************");
  console.log(callExpAST);
  let callExpColl = jscColl.find(callExpAST); // Find all CallExpression AST nodes
  console.log("************* callExpColl = jscColl.find(callExpAST) *****************");
  console.log(callExpColl);
  let removed = callExpColl.remove(); // Remove all CallExpression AST nodes
  console.log("************* removed = callExpColl.remove() *****************");
  console.log(removed);
  let final = removed.toSource(); // Convert the AST to source code
  console.log("************* final = removed.toSource() *****************");
  console.log(final);
  return final;
};
