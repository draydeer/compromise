"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
exports.anyGetInContext = lib_1.anyGetInContext;
var arr_1 = require("./invary/arr");
exports.Arr = arr_1.Arr;
exports.ArrInvary = arr_1.ArrInvary;
exports.arrAll = arr_1.arrAll;
exports.arrAllPatch = arr_1.arrAllPatch;
exports.arrSet = arr_1.arrSet;
exports.arrSetPatch = arr_1.arrSetPatch;
exports.isArr = arr_1.isArr;
var obj_1 = require("./invary/obj");
exports.Obj = obj_1.Obj;
exports.ObjInvary = obj_1.ObjInvary;
exports.objAll = obj_1.objAll;
exports.objAllPatch = obj_1.objAllPatch;
exports.objSet = obj_1.objSet;
exports.objSetPatch = obj_1.objSetPatch;
exports.isObj = obj_1.isObj;
var arr_dev_mode_1 = require("./invary/arr_dev_mode");
var obj_dev_mode_1 = require("./invary/obj_dev_mode");
// monkey patch of dev mode
if (lib_1.Context.isDevMode) {
    exports.Arr = arr_dev_mode_1.Arr;
    exports.ArrInvary = arr_dev_mode_1.ArrInvary;
    exports.arrAll = arr_dev_mode_1.arrAll;
    exports.arrAllPatch = arr_dev_mode_1.arrAllPatch;
    exports.arrSet = arr_dev_mode_1.arrSet;
    exports.arrSetPatch = arr_dev_mode_1.arrSetPatch;
    exports.isArr = arr_dev_mode_1.isArr;
    exports.Obj = obj_dev_mode_1.Obj;
    exports.ObjInvary = obj_dev_mode_1.ObjInvary;
    exports.objAll = obj_dev_mode_1.objAll;
    exports.objAllPatch = obj_dev_mode_1.objAllPatch;
    exports.objSet = obj_dev_mode_1.objSet;
    exports.objSetPatch = obj_dev_mode_1.objSetPatch;
    exports.isObj = obj_dev_mode_1.isObj;
}
exports.get = function (target, key, def) {
    return exports.anyGetInContext.call(target, key, def);
};
exports.set = function (target, key, val) {
    return target instanceof Array ? exports.arrSet(target, key, val) : exports.objSet(target, key, val);
};
exports.all = function (target, a, b, c, d, e, f, g, h) {
    return target instanceof Array ? exports.arrAll.apply(null, arguments) : exports.objAll.apply(null, arguments);
};
exports.setPatch = function (target, key, val) {
    return exports.objSetPatch(target, key, val);
};
exports.allPatch = function (target, a, b, c, d, e, f, g, h) {
    return exports.objAllPatch.apply(null, arguments);
};
exports.allPatchCompare = function (target, source) {
    return source instanceof Array ? lib_1.arrPatchCompare(target, source) : lib_1.objPatchCompare(target, source);
};
exports.construct = function (mixed) {
    return mixed instanceof Array ? exports.Arr(mixed) : exports.Obj(mixed);
};
