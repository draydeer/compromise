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
var mutableDevMode = lib_1.Context.isDevMode;
var mutableIndex = 0;
function ObjInvary(obj, noFreeze) {
    if (obj) {
        lib_1.objCopySingle(obj, this);
    }
    if (true !== noFreeze) {
        lib_1.arrObjFreeze(this);
    }
}
exports.ObjInvary = ObjInvary;
var ObjInvaryProto = function () { };
var specializedObjInvary = lib_2.specialize(function () {
    if (mutableCurrent === true) {
        mutableCurrent = new ObjInvary(this, true);
        return mutableCurrent;
    }
    return mutableCurrent || new ObjInvary(this, true);
}, function () {
    if (!mutableCurrent) {
        this.freeze();
    }
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
        mutableDevMode = false;
        var result = callback(this);
        mutableCurrent = mutables[--mutableIndex];
        if (mutableIndex === 0) {
            mutableDevMode = lib_1.Context.isDevMode;
            if (result.freeze) {
                result.freeze();
            }
        }
        return result;
    },
    freeze: function () {
        return lib_1.arrObjFreeze(this);
    },
    isObj: function (val) { return val instanceof ObjInvary; },
});
exports.isObj = ObjInvary.prototype.isObj;
exports.toObj = function (obj) {
    return obj instanceof ObjInvary ? obj : new ObjInvary(obj);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqX2Rldl9tb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ludmFyeS9vYmpfZGV2X21vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4QkFPZ0I7QUFPaEIsOEJBQWtDO0FBRXJCLFFBQUEsR0FBRyxHQUFHLFVBQVksS0FBVTtJQUNyQyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQWdCLEtBQUssQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUFHLGdCQUFVLENBQUMsbUJBQWEsQ0FBQyxDQUFDO0FBRWpDLFFBQUEsTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7QUFDekIsUUFBQSxXQUFXLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztBQUNuQyxRQUFBLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0FBQ3pCLFFBQUEsV0FBVyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7QUFFaEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0IsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBQzNCLElBQUksY0FBYyxHQUFHLGFBQU8sQ0FBQyxTQUFTLENBQUM7QUFDdkMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLG1CQUE2QixHQUFTLEVBQUUsUUFBa0I7SUFDdEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNVLG1CQUFhLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQixrQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7QUFDTCxDQUFDO0FBUkQsOEJBUUM7QUFFRCxJQUFNLGNBQWMsR0FBRyxjQUFhLENBQUMsQ0FBQztBQUV0QyxJQUFNLG9CQUFvQixHQUFHLGdCQUFVLENBQ25DO0lBQ0ksRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUIsY0FBYyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzQyxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNLENBQUMsY0FBYyxJQUFJLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2RCxDQUFDLEVBQ0Q7SUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7QUFDTCxDQUFDLENBQ0osQ0FBQztBQUVGLGNBQWMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUU1QyxTQUFTLENBQUMsU0FBUyxHQUFHLHFCQUFlLENBQUMsSUFBSSxjQUFjLEVBQUUsRUFBRTtJQUN4RCxXQUFXLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXO0lBQ3pDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxZQUFZO0lBQ3RDLEdBQUcsRUFBRSxxQkFBZTtJQUNwQixHQUFHLEVBQUUsb0JBQW9CLENBQUMsWUFBWTtJQUN0QyxLQUFLLEVBQUUsVUFBVSxRQUFRO1FBQ3JCLFFBQVEsQ0FBQyxFQUFHLFlBQVksQ0FBQyxHQUFHLGNBQWMsQ0FBQztRQUMzQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFFdkIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVCLGNBQWMsR0FBRyxRQUFRLENBQUMsRUFBRyxZQUFZLENBQUMsQ0FBQztRQUUzQyxFQUFFLENBQUMsQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixjQUFjLEdBQUcsYUFBTyxDQUFDLFNBQVMsQ0FBQztZQUVuQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0QsTUFBTSxFQUFFO1FBQ0osTUFBTSxDQUFDLGtCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELEtBQUssRUFBRSxVQUFDLEdBQVEsSUFBYyxPQUFBLEdBQUcsWUFBWSxTQUFTLEVBQXhCLENBQXdCO0NBQ3pELENBQUMsQ0FBQztBQUVVLFFBQUEsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0FBQ2xDLFFBQUEsS0FBSyxHQUFHLFVBQVUsR0FBRztJQUM5QixNQUFNLENBQUMsR0FBRyxZQUFZLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvRCxDQUFDLENBQUMifQ==