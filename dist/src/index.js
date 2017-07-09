"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
var ArrImport = lib_1.Context.isDevMode ? require('./compromise/arr_dev_mode') : require('./compromise/arr');
var ObjImport = lib_1.Context.isDevMode ? require('./compromise/obj_dev_mode') : require('./compromise/obj');
var Arr = ArrImport.Arr;
exports.Arr = Arr;
var ArrCompromise = ArrImport.ArrCompromise;
exports.ArrCompromise = ArrCompromise;
var arrAll = ArrImport.arrAll;
var arrAllPatch = ArrImport.arrAllPatch;
var arrSetInContext = ArrImport.arrSetInContext;
var arrSetInContextPatch = ArrImport.arrSetInContextPatch;
var isArr = ArrImport.isArr;
exports.isArr = isArr;
var Obj = ObjImport.Obj;
exports.Obj = Obj;
var ObjCompromise = ObjImport.ObjCompromise;
exports.ObjCompromise = ObjCompromise;
var objAll = ObjImport.objAll;
var objAllPatch = ObjImport.objAllPatch;
var objSetInContext = ObjImport.objSetInContext;
var objSetInContextPatch = ObjImport.objSetInContextPatch;
var isObj = ObjImport.isObj;
exports.isObj = isObj;
exports.get = function (target, key, def) {
    return lib_1.anyGetInContext.call(target, key, def);
};
exports.set = function (target, key, val) {
    return target instanceof Array ? arrSetInContext.call(target, key, val) : objSetInContext.call(target, key, val);
};
exports.all = function (target, a, b, c, d, e, f, g, h) {
    return target instanceof Array ? arrAll.apply(null, arguments) : objAll.apply(null, arguments);
};
exports.getPatch = function (target, key, def) {
    return lib_1.anyGetInContext.call(target, key, def);
};
exports.setPatch = function (target, key, val) {
    return objSetInContextPatch.call(target, key, val);
};
exports.allPatch = function (target, a, b, c, d, e, f, g, h) {
    return objAllPatch.apply(null, arguments);
};
exports.allPatchCompare = function (target, source) {
    return source instanceof Array ? lib_1.arrPatchCompare(target, source) : lib_1.objPatchCompare(target, source);
};
