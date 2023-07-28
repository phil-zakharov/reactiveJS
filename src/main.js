"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("./energeticly/Container");
var Primitive_1 = require("./energeticly/Primitive");
function fromValue(v) {
    return new Primitive_1.Primitive(v);
}
function from() {
    var r = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        r[_i] = arguments[_i];
    }
    return new (Container_1.Container.bind.apply(Container_1.Container, __spreadArray([void 0, reduce], r, false)))();
}
function reduce(nums) {
    return nums.reduce(function (acc, v) { return acc + v; }, 0);
}
var a = fromValue(1), b = fromValue(2), c = from(a, b), d = from(c).map(function (aValue, bValue) { return aValue + bValue + 5; });
console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log('1 -> ', a.getValue()); // 1
console.log('2 -> ', b.getValue()); // 2
console.log('Exception -> ', c.getValue()); // Exception
console.log('8 -> ', d.getValue()); // 8
a.updateValue(function (val) { return val + 10; });
console.log('11 -> ', a.getValue()); // 11
console.log('2 -> ', b.getValue()); // 2
console.log('18 -> ', d.getValue()); // 18
