const describe = require('jscodeshift-helper').describe;
const keypress = require('./util/keypress');

async function describeAndPause(obj) {
  describe(obj);
  await keypress()
}

async function main(fileInfo, api, options) {

  console.log("hello jscodeshift!");
  debugger;
  
  console.log("**********************fileInfo**************************");
  await describeAndPause(fileInfo);
  
  console.log("**********************options**************************");
  await describeAndPause(options);

  let j = api.jscodeshift;

  let jscColl = j(fileInfo.source);
  console.log("************* jscColl = j(fileInfo.source) *****************");
  await describeAndPause(jscColl);

  console.log('*****Register "findCalls" method: Now collections have the method "findCalls"***');
  j.registerMethods({
    findCalls: function() {
      return this.find(j.CallExpression);
    }
  });

  let callExpColl = jscColl.findCalls(); // Find all CallExpression AST nodes
  console.log("************* callExpColl = jscColl.findCalls() *****************");
  await describeAndPause(callExpColl);

  let removed = callExpColl.remove(); // Remove all CallExpression AST nodes
  console.log("************* removed = callExpColl.remove() *****************");
  await describeAndPause(removed);

  let final = removed.toSource(); // Convert the AST to source code
  console.log("************* final = removed.toSource() *****************");
  describe(final);
  process.stdin.pause();
  // Pauses the incoming 'data' events.
  return final;
};

module.exports = main;