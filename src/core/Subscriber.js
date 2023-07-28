"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriber = void 0;
var Subscriber = /** @class */ (function () {
    function Subscriber() {
        this.subs = new Set();
    }
    Subscriber.prototype.subscribe = function (sub) {
        this.subs.add(sub);
    };
    Subscriber.prototype.unsubscribe = function (sub) {
        this.subs.delete(sub);
    };
    Subscriber.prototype.runSubs = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this.subs.forEach(function (sub) { return sub.apply(void 0, values); });
    };
    return Subscriber;
}());
exports.Subscriber = Subscriber;
