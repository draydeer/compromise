"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var lib_2 = require("../lib");
var specialized = lib_2.specialize(lib_2.objCopySingle);
var setByGetSetKeysCache = specialized.setByGetSetKeysCache;
function Rec(props) {
    var RecInvary = /** @class */ (function () {
        function RecInvary(props) {
            if (props) {
                lib_2.objCopySingle(props, this);
            }
        }
        RecInvary.prototype.set = function (key, val) {
            if (lib_1.anyGetInContext.call(this, key) === val) {
                return this;
            }
            if (false === lib_1.Context.getSetKeysCache[0] in props) {
                throw new Error("Key was not defined in props: " + lib_1.Context.getSetKeysCache[0]);
            }
            return new RecInvary(setByGetSetKeysCache(this, val));
        };
        ;
        return RecInvary;
    }());
    lib_2.objCopySingle(props, RecInvary.prototype);
    return RecInvary;
}
exports.Rec = Rec;
