module.exports = function (fileInfo, api, options) {
  console.log("hello world!");
  debugger;
  return api
    .jscodeshift(fileInfo.source)
    .findVariableDeclarators("foo")
    .renameTo("bar")
    .toSource();
};
