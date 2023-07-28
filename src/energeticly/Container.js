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
exports.Container = void 0;
var Subscriber_1 = require("../core/Subscriber");
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container(reduce) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.reduce = reduce;
        _this.sources = [];
        _this.values = [];
        sources.forEach(function (src, index) {
            _this.sources.push(src);
            _this.values.push(src.getValue());
            src.subscribe(function () {
                var v = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    v[_i] = arguments[_i];
                }
                return _this.onUpdateChild.apply(_this, __spreadArray([index], v, false));
            });
        });
        return _this;
    }
    Container.prototype.onUpdateChild = function (index) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        this.values[index] = this.reduce(values);
        this.runSubs.apply(this, this.values);
    };
    Container.prototype.map = function (fn) {
        console.log('🚀 ~ file: Container.ts:27 ~ Container<T> ~ map ~ this.values:', this.values);
        this.values = fn(this.values);
        console.log('🚀 ~ file: Container.ts:27 ~ Container<T> ~ map ~ this.values:', this.values);
        return this;
    };
    Container.prototype.getValue = function () {
        if (this.sources.length !== this.values.length) {
            return -1;
        }
        return this.reduce(this.values);
    };
    return Container;
}(Subscriber_1.Subscriber));
exports.Container = Container;
