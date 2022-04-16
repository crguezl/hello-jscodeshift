#!/usr/bin/env node

const path = require('path');
const { run: jscodeshift } = require("jscodeshift/src/Runner");

const transformPath = path.join(__dirname, "transform.js");
const paths = [
  "__testfixtures__/function-declaration.input.js", 
  "__testfixtures__/function-expression.input.js"];
const options = {
  dry: true, // dry run (no changes are made to files)
  print: true, // print transformed files to stdout, useful for development
  verbose: 2, // show more information about the transform process (up to 2)
  // Essential if we want the chrome debugger to work!
  runInBand: true, // run jscodeshift in the current process
};

async function run() {
  const res = await jscodeshift(transformPath, paths, options);
  console.log(res);
}

run();