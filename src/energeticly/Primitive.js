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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitive = void 0;
var Subscriber_1 = require("../core/Subscriber");
var Primitive = /** @class */ (function (_super) {
    __extends(Primitive, _super);
    function Primitive(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Primitive.prototype.getValue = function () {
        return this.value;
    };
    Primitive.prototype.updateValue = function (cb) {
        this.value = cb(this.value);
        this.runSubs(this.value);
    };
    return Primitive;
}(Subscriber_1.Subscriber));
exports.Primitive = Primitive;
