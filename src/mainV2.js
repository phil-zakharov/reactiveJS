"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Subscriber_1 = require("./Subscriber");
var PrimitiveValue = /** @class */ (function (_super) {
    __extends(PrimitiveValue, _super);
    function PrimitiveValue(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    PrimitiveValue.prototype.getValue = function () {
        return this.value;
    };
    PrimitiveValue.prototype.updateValue = function (cb) {
        this.value = cb(this.value);
        this.runSubs(this.value);
    };
    return PrimitiveValue;
}(Subscriber_1.Subscriber));
var ContainerValue = /** @class */ (function (_super) {
    __extends(ContainerValue, _super);
    function ContainerValue() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.sources = [];
        _this.values = [];
        _this.cb = null;
        items.forEach(function (item, index) {
            _this.values.push(item.getValue());
            _this.sources.push(item);
            item.subscribe(function () {
                var v = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    v[_i] = arguments[_i];
                }
                return _this.onUpdateChild.apply(_this, __spreadArray([index], v, false));
            });
        });
        return _this;
    }
    ContainerValue.prototype.map = function (cb) {
        this.cb = cb;
        return this;
    };
    ContainerValue.prototype.onUpdateChild = function (index) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        if (values.length === 1) {
            this.values[index] = values[0];
        }
        else if (this.values.length === 1) {
            this.values[index] = values.reduce(function (acc, v) { return acc + v; }, 0);
        }
        this.runSubs.apply(this, this.values);
    };
    ContainerValue.prototype.getValue = function () {
        var _this = this;
        if (!this.cb)
            return -1;
        if (this.values.length !== this.cb.length) {
            var s = this.sources[0];
            if (s instanceof ContainerValue) {
                return s.map(function () {
                    var v = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        v[_i] = arguments[_i];
                    }
                    return _this.cb.apply(_this, v);
                }).getValue();
            }
        }
        return this.cb.apply(this, this.values);
    };
    return ContainerValue;
}(Subscriber_1.Subscriber));
function fromValue(v) {
    return new PrimitiveValue(v);
}
function from() {
    var r = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        r[_i] = arguments[_i];
    }
    return new (ContainerValue.bind.apply(ContainerValue, __spreadArray([void 0], r, false)))();
}
var a = fromValue(1), b = fromValue(2), c = from(a, b), d = from(c).map(function (aValue, bValue) { return aValue + bValue + 5; });
console.log('1 -> ', a.getValue()); // 1
console.log('2 -> ', b.getValue()); // 2
console.log('Exception -> ', c.getValue()); // Exception
console.log('8 -> ', d.getValue()); // 8
a.updateValue(function (val) { return val + 10; });
console.log('11 -> ', a.getValue()); // 11
console.log('2 -> ', b.getValue()); // 2
console.log('18 -> ', d.getValue()); // 18
