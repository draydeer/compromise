"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var lib_2 = require("../lib");
var const_1 = require("../const");
exports.Obj = function (value) {
    return new ObjInvary(value);
};
var copySet = new Set();
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
        return mutableCurrent = new ObjInvary(this);
    }
    return mutableCurrent || new ObjInvary(this);
});
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
    set: specializedObjInvary.setInContext,
    //set1: function (key: TKey, val: any) {
    //    if (anyGetInContext.call(this, key) === val) {
    //        return this;
    //    }
    //
    //    let root, self;
    //    let i, l;
    //
    //    if (mutableCurrent === true) {
    //        self = root = mutableCurrent = new ObjInvary(this);
    //    } else {
    //        self = root = mutableCurrent || new ObjInvary(this);
    //    }
    //
    //    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
    //        const v = self[Context.getSetKeysCache[i]];
    //
    //        self = self[Context.getSetKeysCache[i]] = (v && typeof v === OBJECT) ? arrObjClone(v) : {};
    //    }
    //
    //    self[Context.getSetKeysCache[i]] = val;
    //
    //    Context.getSetKeysCache = null;
    //
    //    return root;
    //},
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
