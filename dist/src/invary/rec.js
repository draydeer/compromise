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
        RecInvary.prototype.get = function (key, def) { };
        RecInvary.prototype.set = function (key, val) {
            if (lib_1.anyGetInContext.call(this, key) === val) {
                return this;
            }
            if (false === lib_1.Context.getSetKeysCache[0] in props) {
                throw new Error("Key was not defined in props: " + lib_1.Context.getSetKeysCache[0]);
            }
            return new RecInvary(setByGetSetKeysCache(this, val));
        };
        RecInvary.prototype.freeze = function () {
            return lib_1.arrObjFreeze(this);
        };
        return RecInvary;
    }());
    lib_2.objCopySingle(props, RecInvary.prototype);
    RecInvary.prototype.get = lib_1.anyGetInContext;
    return RecInvary;
}
exports.Rec = Rec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ludmFyeS9yZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4QkFJZ0I7QUFLaEIsOEJBQWlEO0FBRWpELElBQU0sV0FBVyxHQUFHLGdCQUFVLENBQUMsbUJBQWEsQ0FBQyxDQUFDO0FBQzlDLElBQU0sb0JBQW9CLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBRTlELGFBQXVCLEtBQVE7SUFDM0I7UUFDSSxtQkFBWSxLQUFrQjtZQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLG1CQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDTCxDQUFDO1FBRU0sdUJBQUcsR0FBVixVQUFXLEdBQVMsRUFBRSxHQUFTLElBQUcsQ0FBQztRQUU1Qix1QkFBRyxHQUFWLFVBQVcsR0FBUyxFQUFFLEdBQVE7WUFDMUIsRUFBRSxDQUFDLENBQUMscUJBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxhQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQWlDLGFBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFHLENBQUMsQ0FBQztZQUNuRixDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFTSwwQkFBTSxHQUFiO1lBQ0ksTUFBTSxDQUFDLGtCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FBQyxBQXhCRCxJQXdCQztJQUVELG1CQUFhLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUUxQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxxQkFBZSxDQUFDO0lBRTFDLE1BQU0sQ0FBZ0IsU0FBUyxDQUFDO0FBQ3BDLENBQUM7QUFoQ0Qsa0JBZ0NDIn0=