const defineTest = require("jscodeshift/dist/testUtils").defineTest;

jest.autoMockOff();

describe("prefix-function", () => {
  defineTest(__dirname, "transform", null, 'function-declaration');
  defineTest(__dirname, "transform", null, 'function-expression');
});
