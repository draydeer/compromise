"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var lib_2 = require("../lib");
var const_1 = require("../const");
exports.Obj = function (value) {
    return new ObjInvary(value);
};
var copySet = new Set();
//export function objSet(ctx: any, key: TKey, val: any) {
//    if (anyGetInContext.call(ctx, key) === val) {
//        return ctx;
//    }
//
//    return objSetDirect(ctx, key, val);
//}
//
//export function objSetDirect(ctx: any, key: TKey, val: any) {
//    let root, self = root = objCopySingle(ctx);
//    let i, l;
//
//    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
//        const v = self[Context.getSetKeysCache[i]];
//
//        self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : {};
//    }
//
//    self[Context.getSetKeysCache[i]] = val;
//
//    Context.getSetKeysCache = null;
//
//    return root;
//}
//
//export function objSetDirectMutable(ctx: any, key: TKey, val: any) {
//    let self = ctx;
//    let i, l;
//
//    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
//        const v = self[Context.getSetKeysCache[i]];
//
//        self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? v : {};
//    }
//
//    self[Context.getSetKeysCache[i]] = val;
//
//    Context.getSetKeysCache = null;
//
//    return ctx;
//}
//
//export function objSetPatch(ctx: any, key: TKey, val: any) {
//    if (anyGetInContext.call(ctx, key) === val) {
//        return {};
//    }
//
//    let root, self = root = {[Context.getSetKeysCache[0]]: ctx[Context.getSetKeysCache[0]]};
//    let i, l;
//
//    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
//        const v = self[Context.getSetKeysCache[i]];
//
//        self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : {};
//    }
//
//    self[Context.getSetKeysCache[i]] = val;
//
//    Context.getSetKeysCache = null;
//
//    return root;
//}
//
//export function objAll(ctx, a?, b?, c?, d?, e?, f?, g?, h?) {
//    if (arguments.length < 4) {
//        return objSet(ctx, a, b);
//    }
//
//    let root = ctx;
//    let self;
//    let i, j, l, m;
//
//    copySet.clear();
//
//    for (i = 1, l = arguments.length; i < l; i += 2) {
//        if (anyGetInContext.call(ctx, arguments[i]) === arguments[i + 1]) {
//            continue;
//        }
//
//        if (root === ctx) {
//            self = root = objCopySingle(ctx);
//        } else {
//            self = root;
//        }
//
//        for (j = 0, m = Context.getSetKeysCache.length - 1; j < m; j ++) {
//            const v = self[Context.getSetKeysCache[j]];
//
//            if (v && typeof v === "object") {
//                if (false === copySet.has(v)) {
//                    self = self[Context.getSetKeysCache[j]] = arrObjClone(v);
//
//                    copySet.add(self);
//                } else {
//                    self = v;
//                }
//            } else {
//                self = self[Context.getSetKeysCache[j]] = {};
//            }
//        }
//
//        self[Context.getSetKeysCache[j]] = arguments[i + 1];
//    }
//
//    Context.getSetKeysCache = null;
//
//    return root;
//}
//
//export function objAllPatch(ctx, a?, b?, c?, d?, e?, f?, g?, h?) {
//    if (arguments.length < 4) {
//        return objSetPatch(ctx, a, b);
//    }
//
//    let root = {};
//    let self;
//    let i, j, l, m;
//
//    copySet.clear();
//
//    for (i = 1, l = arguments.length; i < l; i += 2) {
//        if (anyGetInContext.call(ctx, arguments[i]) === arguments[i + 1]) {
//            continue;
//        }
//
//        self = root;
//
//        if (false === Context.getSetKeysCache[0] in self) {
//            self[Context.getSetKeysCache[0]] = ctx[Context.getSetKeysCache[0]];
//        }
//
//        for (j = 0, m = Context.getSetKeysCache.length - 1; j < m; j ++) {
//            const v = self[Context.getSetKeysCache[j]];
//
//            if (v && typeof v === "object") {
//                if (false === copySet.has(v)) {
//                    self = self[Context.getSetKeysCache[j]] = arrObjClone(v);
//
//                    copySet.add(self);
//                } else {
//                    self = v;
//                }
//            } else {
//                self = self[Context.getSetKeysCache[j]] = {};
//            }
//        }
//
//        self[Context.getSetKeysCache[j]] = arguments[i + 1];
//    }
//
//    Context.getSetKeysCache = null;
//
//    return root;
//}
var specialized = lib_2.specialize(lib_1.objCopySingle);
exports.objSet = specialized.set;
exports.objSetDirect = specialized.setDirect;
exports.objSetDirectMutable = specialized.setDirectMutable;
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
var ObjInvaryProto = function () { };
ObjInvaryProto.prototype = Object.prototype;
ObjInvary.prototype = lib_1.objAssignSingle(new ObjInvaryProto(), {
    constructor: Object.prototype.constructor,
    all: function (a, b, c, d, e, f, g, h) {
        if (arguments.length < 3) {
            return ObjInvary.prototype.set.call(this, a, b);
        }
        var root = this;
        var self;
        var i, j, l, m;
        copySet.clear();
        for (i = 0, l = arguments.length; i < l; i += 2) {
            if (lib_1.anyGetInContext.call(this, arguments[i]) === arguments[i + 1]) {
                continue;
            }
            if (root === this) {
                if (mutableCurrent === true) {
                    self = root = mutableCurrent = new ObjInvary(this);
                }
                else {
                    self = root = mutableCurrent || new ObjInvary(this);
                }
            }
            else {
                self = root;
            }
            for (j = 0, m = lib_1.Context.getSetKeysCache.length - 1; j < m; j++) {
                var v = self[lib_1.Context.getSetKeysCache[j]];
                if (v && typeof v === const_1.OBJECT) {
                    if (false === copySet.has(v)) {
                        self = self[lib_1.Context.getSetKeysCache[j]] = lib_1.arrObjClone(v);
                        copySet.add(self);
                    }
                    else {
                        self = v;
                    }
                }
                else {
                    self = self[lib_1.Context.getSetKeysCache[j]] = {};
                }
            }
            self[lib_1.Context.getSetKeysCache[j]] = arguments[i + 1];
        }
        lib_1.Context.getSetKeysCache = null;
        return root;
    },
    get: lib_1.anyGetInContext,
    set: function (key, val) {
        if (lib_1.anyGetInContext.call(this, key) === val) {
            return this;
        }
        var root, self;
        var i, l;
        if (mutableCurrent === true) {
            self = root = mutableCurrent = new ObjInvary(this);
        }
        else {
            self = root = mutableCurrent || new ObjInvary(this);
        }
        for (i = 0, l = lib_1.Context.getSetKeysCache.length - 1; i < l; i++) {
            var v = self[lib_1.Context.getSetKeysCache[i]];
            self = self[lib_1.Context.getSetKeysCache[i]] = (v && typeof v === const_1.OBJECT) ? lib_1.arrObjClone(v) : {};
        }
        self[lib_1.Context.getSetKeysCache[i]] = val;
        lib_1.Context.getSetKeysCache = null;
        return root;
    },
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
