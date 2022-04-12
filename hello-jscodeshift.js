module.exports = function (fileInfo, api, options) {
  console.log(options.chazam);
  return api
    .jscodeshift(fileInfo.source)
    .findVariableDeclarators("foo")
    .renameTo("bar")
    .toSource();
};
