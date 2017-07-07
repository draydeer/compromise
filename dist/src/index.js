"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
var arr_1 = require("./compromise/arr");
exports.Arr = arr_1.Arr;
exports.ArrCompromise = arr_1.ArrCompromise;
exports.isArr = arr_1.isArr;
var obj_1 = require("./compromise/obj");
exports.Obj = obj_1.Obj;
exports.ObjCompromise = obj_1.ObjCompromise;
exports.isObj = obj_1.isObj;
exports.get = function (target, key, def) {
    return lib_1.anyGetInContext.call(target, key, def);
};
exports.set = function (target, key, val) {
    return target instanceof Array ? arr_1.arrSetInContext.call(target, key, val) : obj_1.objSetInContext.call(target, key, val);
};
exports.all = function (target) {
    return target instanceof Array ? arr_1.arrAll.apply(null, arguments) : obj_1.objAll.apply(null, arguments);
};
exports.getPatch = function (target, key, def) {
    return lib_1.anyGetInContext.call(target, key, def);
};
exports.setPatch = function (target, key, val) {
    return obj_1.objSetInContextPatch.call(target, key, val);
};
exports.allPatch = function (target) {
    return obj_1.objAllPatch.apply(null, arguments);
};
exports.allPatchCompare = function (target, source) {
    return source instanceof Array ? lib_1.arrPatchCompare(target, source) : lib_1.objPatchCompare(target, source);
};
