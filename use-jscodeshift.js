#!/usr/bin/env node
const path = require('path');
const { run: jscodeshift } = require("jscodeshift/src/Runner");

const transformPath = path.join(__dirname, "hello-jscodeshift.js");
const paths = ["foo.js", "foo2.js"];
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

// ✗ node use-jscodeshift.js
// Processing 2 files... 
// Spawning 2 workers...
// Running in dry mode, no files will be written! 
// Sending 1 files to free worker...
// Sending 1 files to free worker...
// var bar = 4;
// console.log(bar*bar /* square foo */);
// console.log("more foo");
// var bar = 4;
// console.log(bar+bar /* twice foo */);
// console.log("foo");
//  OKK foo2.js
//  OKK foo.js
// All done. 
// Results: 
// 0 errors
// 0 unmodified
// 0 skipped
// 2 ok
// Time elapsed: 0.456seconds 
// {
//   stats: {},
//   timeElapsed: '0.456',
//   error: 0,
//   ok: 2,
//   nochange: 0,
//   skip: 0
// }