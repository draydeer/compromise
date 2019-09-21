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
            lib_1.arrObjFreeze(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjX2Rldl9tb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ludmFyeS9yZWNfZGV2X21vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4QkFJZ0I7QUFLaEIsOEJBQWlEO0FBRWpELElBQU0sV0FBVyxHQUFHLGdCQUFVLENBQUMsbUJBQWEsQ0FBQyxDQUFDO0FBQzlDLElBQU0sb0JBQW9CLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBRTlELGFBQXVCLEtBQVE7SUFDM0I7UUFDSSxtQkFBWSxLQUFrQjtZQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLG1CQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFFRCxrQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFFTSx1QkFBRyxHQUFWLFVBQVcsR0FBUyxFQUFFLEdBQVMsSUFBRyxDQUFDO1FBRTVCLHVCQUFHLEdBQVYsVUFBVyxHQUFTLEVBQUUsR0FBUTtZQUMxQixFQUFFLENBQUMsQ0FBQyxxQkFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLGFBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBaUMsYUFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUcsQ0FBQyxDQUFDO1lBQ25GLENBQUM7WUFFRCxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUVNLDBCQUFNLEdBQWI7WUFDSSxNQUFNLENBQUMsa0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQUFDLEFBMUJELElBMEJDO0lBRUQsbUJBQWEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLHFCQUFlLENBQUM7SUFFMUMsTUFBTSxDQUFnQixTQUFTLENBQUM7QUFDcEMsQ0FBQztBQWxDRCxrQkFrQ0MifQ==