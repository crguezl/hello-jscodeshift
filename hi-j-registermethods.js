var describe = require('jscodeshift-helper').describe;

module.exports = function (fileInfo, api, options) {

  console.log("hello jscodeshift!");
  debugger;
  
  console.log("**********************fileInfo**************************");
  describe(fileInfo);

  console.log("**********************options**************************");
  describe(options);

  let j = api.jscodeshift;

  let jscColl = j(fileInfo.source);
  console.log("************* jscColl = j(fileInfo.source) *****************");
  describe(jscColl);


  j.registerMethods({
    findCalls: function() {
      return this.find(j.CallExpression);
    }
  });

  let callExpColl = jscColl.findCalls(); // Find all CallExpression AST nodes
  console.log("************* callExpColl = jscColl.find(callExpAST) *****************");
  describe(callExpColl);

  let removed = callExpColl.remove(); // Remove all CallExpression AST nodes
  console.log("************* removed = callExpColl.remove() *****************");
  describe(removed);

  let final = removed.toSource(); // Convert the AST to source code
  console.log("************* final = removed.toSource() *****************");
  describe(final);
  return final;
};
