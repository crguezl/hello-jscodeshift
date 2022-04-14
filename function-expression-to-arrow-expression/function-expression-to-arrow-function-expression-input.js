/*
 * Converts a FunctionExpression to an ArrowFunctionExpression when safe to do so.
*/
var a = function(a, b) {
	return a + b;
}
var b = function(a, b) {
 	var c = 0;
  	return a + b + c;
}
var a = function(a, b) {
 	return a + b + this.c;
}

var a = (a, b) => a + b
var b = (a, b) => {
 	var c = 0;
  	return a + b + c;
}
var a = function(a, b) {
 	return a + b + this.c;
}

var a = function(a, b) {
	return a + b;
}
var b = function(a, b) {
 	var c = 0;
  	return a + b + c;
}
var a = function(a, b) {
 	return a + b + this.c;
}

var a = (a, b) => a + b
var b = (a, b) => {
 	var c = 0;
  	return a + b + c;
}
var a = function(a, b) {
 	return a + b + this.c;
}
