(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const config = require('./config')
const CutMethod = require('./cutMethod')

var method1 = new CutMethod('sss', 1, 2)

console.log(method1)

},{"./config":2,"./cutMethod":3}],2:[function(require,module,exports){
module.exports = {
    columns: 4
}
},{}],3:[function(require,module,exports){
module.exports = class CutMethod {
    
    constructor(cutAmountTypeA, cutAmountTypeB, garbage) {
        this.cutAmountTypeA = cutAmountTypeA
        this.cutAmountTypeB = cutAmountTypeB
        this.garbage = garbage
    }
}
},{}]},{},[1]);
