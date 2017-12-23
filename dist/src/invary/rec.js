"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var obj_1 = require("./obj");
function RecInvary(props) {
    var RecInvary = /** @class */ (function () {
        function RecInvary(props) {
            this.__props = function () {
                return props;
            };
        }
        RecInvary.prototype.set = function (key, val) {
            if (lib_1.anyGetInContext.call(this, key) === val) {
                return this;
            }
            var p = this.__props();
            if (p) {
                return new RecInvary(obj_1.objSetDirect(p, key, val));
            }
            return new RecInvary(obj_1.objSetDirectMutable({}, key, val));
        };
        ;
        return RecInvary;
    }());
    var _loop_1 = function (k) {
        if (props.hasOwnProperty(k)) {
            Object.defineProperty(RecInvary.prototype, k, {
                get: function () {
                    var p = this.__props();
                    return p && k in p ? p[k] : props[k];
                }
            });
        }
    };
    for (var k in props) {
        _loop_1(k);
    }
    return RecInvary;
}
exports.RecInvary = RecInvary;
