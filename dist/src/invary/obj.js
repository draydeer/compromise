"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var lib_2 = require("../lib");
exports.Obj = function (value) {
    return new ObjInvary(value);
};
var specialized = lib_2.specialize(lib_1.objCopySingle);
exports.objSet = specialized.set;
exports.objSetPatch = specialized.setPatch;
exports.objAll = specialized.all;
exports.objAllPatch = specialized.allPatch;
var mutables = new Array(32);
var mutableCurrent = false;
var mutableIndex = 0;
function ObjInvary(obj) {
    if (obj) {
        lib_1.objCopySingle(obj, this);
    }
}
exports.ObjInvary = ObjInvary;
function ObjInvaryProto() { }
var specializedObjInvary = lib_2.specialize(function () {
    if (mutableCurrent === true) {
        mutableCurrent = new ObjInvary(this);
        return mutableCurrent;
    }
    return mutableCurrent || new ObjInvary(this);
});
ObjInvaryProto.prototype = Object.prototype;
ObjInvary.prototype = lib_1.objAssignSingle(new ObjInvaryProto(), {
    constructor: Object.prototype.constructor,
    all: specializedObjInvary.allInContext,
    get: lib_1.anyGetInContext,
    set: specializedObjInvary.setInContext,
    batch: function (callback) {
        mutables[++mutableIndex] = mutableCurrent;
        mutableCurrent = true;
        var result = callback(this);
        mutableCurrent = mutables[--mutableIndex];
        return result;
    },
    freeze: function () {
        return lib_1.arrObjFreeze(this);
    },
    isObj: function (val) { return val instanceof ObjInvary; },
});
exports.isObj = ObjInvary.prototype.isObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ludmFyeS9vYmoudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4QkFPZ0I7QUFPaEIsOEJBQWtDO0FBR3JCLFFBQUEsR0FBRyxHQUFHLFVBQVksS0FBVTtJQUNyQyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQWdCLEtBQUssQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUFHLGdCQUFVLENBQUMsbUJBQWEsQ0FBQyxDQUFDO0FBRWpDLFFBQUEsTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7QUFDekIsUUFBQSxXQUFXLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztBQUNuQyxRQUFBLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0FBQ3pCLFFBQUEsV0FBVyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7QUFFaEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0IsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBQzNCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQixtQkFBNkIsR0FBUztJQUNsQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1MsbUJBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztBQUNMLENBQUM7QUFKRCw4QkFJQztBQUVELDRCQUEyQixDQUFDO0FBRTVCLElBQU0sb0JBQW9CLEdBQUcsZ0JBQVUsQ0FBQztJQUNwQyxFQUFFLENBQUMsQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxQixjQUFjLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLGNBQWMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQWMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUU1QyxTQUFTLENBQUMsU0FBUyxHQUFHLHFCQUFlLENBQUMsSUFBSSxjQUFjLEVBQUUsRUFBRTtJQUN4RCxXQUFXLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXO0lBQ3pDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxZQUFZO0lBQ3RDLEdBQUcsRUFBRSxxQkFBZTtJQUNwQixHQUFHLEVBQUUsb0JBQW9CLENBQUMsWUFBWTtJQUN0QyxLQUFLLEVBQUUsVUFBVSxRQUFRO1FBQ3JCLFFBQVEsQ0FBQyxFQUFHLFlBQVksQ0FBQyxHQUFHLGNBQWMsQ0FBQztRQUUzQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBRXRCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1QixjQUFjLEdBQUcsUUFBUSxDQUFDLEVBQUcsWUFBWSxDQUFDLENBQUM7UUFFM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0QsTUFBTSxFQUFFO1FBQ0osTUFBTSxDQUFDLGtCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELEtBQUssRUFBRSxVQUFDLEdBQVEsSUFBYyxPQUFBLEdBQUcsWUFBWSxTQUFTLEVBQXhCLENBQXdCO0NBQ3pELENBQUMsQ0FBQztBQUVVLFFBQUEsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDIn0=