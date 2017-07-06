"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
var arr_1 = require("./compromise/arr");
exports.Arr = arr_1.Arr;
exports.isArr = arr_1.isArr;
var obj_1 = require("./compromise/obj");
exports.Obj = obj_1.Obj;
exports.isObj = obj_1.isObj;
exports.get = function (ctx, key, def) {
    return lib_1.anyGetInContext.call(ctx, key, def);
};
exports.set = function (ctx, key, val) {
    return ctx instanceof Array ? arr_1.arrSetInContext.call(ctx, key, val) : obj_1.objSetInContext.call(ctx, key, val);
};
exports.all = function (ctx) {
    return ctx instanceof Array ? arr_1.arrAll.apply(null, arguments) : obj_1.objAll.apply(null, arguments);
};
exports.getPatch = function (ctx, key, def) {
    return lib_1.anyGetInContext.call(ctx, key, def);
};
exports.setPatch = function (ctx, key, val) {
    return obj_1.objSetInContextPatch.call(ctx, key, val);
};
exports.allPatch = function (ctx) {
    return obj_1.objAllPatch.apply(null, arguments);
};
