"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
exports.Obj = function (value) {
    return new ObjCompromise(value);
};
var copySet = new Set();
function objSet(ctx, key, val) {
    if (lib_1.anyGetInContext.call(ctx, key) === val) {
        return ctx;
    }
    var root, self = root = lib_1.objCopySingle(ctx);
    var i, l;
    for (i = 0, l = lib_1.Context.getSetKeysCache.length - 1; i < l; i++) {
        var v = self[lib_1.Context.getSetKeysCache[i]];
        self = self[lib_1.Context.getSetKeysCache[i]] = (v && typeof v === "object") ? lib_1.arrObjClone(v) : {};
    }
    self[lib_1.Context.getSetKeysCache[i]] = val;
    lib_1.Context.getSetKeysCache = null;
    return root;
}
exports.objSet = objSet;
function objSetPatch(ctx, key, val) {
    if (lib_1.anyGetInContext.call(this, key) === val) {
        return {};
    }
    var root, self = root = (_a = {}, _a[lib_1.Context.getSetKeysCache[0]] = ctx[lib_1.Context.getSetKeysCache[0]], _a);
    var i, l;
    for (i = 0, l = lib_1.Context.getSetKeysCache.length - 1; i < l; i++) {
        var v = self[lib_1.Context.getSetKeysCache[i]];
        self = self[lib_1.Context.getSetKeysCache[i]] = (v && typeof v === "object") ? lib_1.arrObjClone(v) : {};
    }
    self[lib_1.Context.getSetKeysCache[i]] = val;
    lib_1.Context.getSetKeysCache = null;
    return root;
    var _a;
}
exports.objSetPatch = objSetPatch;
function objAll(ctx, a, b, c, d, e, f, g, h) {
    if (arguments.length < 4) {
        return objSet(ctx, a, b);
    }
    var root = ctx;
    var self;
    var i, j, l, m;
    copySet.clear();
    for (i = 1, l = arguments.length; i < l; i += 2) {
        if (lib_1.anyGetInContext.call(ctx, arguments[i]) === arguments[i + 1]) {
            continue;
        }
        if (root === ctx) {
            self = root = lib_1.objCopySingle(ctx);
        }
        else {
            self = root;
        }
        for (j = 0, m = lib_1.Context.getSetKeysCache.length - 1; j < m; j++) {
            var v = self[lib_1.Context.getSetKeysCache[j]];
            if (v && typeof v === "object") {
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
}
exports.objAll = objAll;
function objAllPatch(ctx, a, b, c, d, e, f, g, h) {
    if (arguments.length < 4) {
        return objSetPatch(ctx, a, b);
    }
    var root = {};
    var self;
    var i, j, l, m;
    copySet.clear();
    for (i = 1, l = arguments.length; i < l; i += 2) {
        if (lib_1.anyGetInContext.call(ctx, arguments[i]) === arguments[i + 1]) {
            continue;
        }
        self = root;
        if (false === lib_1.Context.getSetKeysCache[0] in self) {
            self[lib_1.Context.getSetKeysCache[0]] = ctx[lib_1.Context.getSetKeysCache[0]];
        }
        for (j = 0, m = lib_1.Context.getSetKeysCache.length - 1; j < m; j++) {
            var v = self[lib_1.Context.getSetKeysCache[j]];
            if (v && typeof v === "object") {
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
}
exports.objAllPatch = objAllPatch;
var mutables = new Array(32);
var mutableCurrent = false;
var mutableIndex = 0;
function ObjCompromise(obj) {
    if (obj) {
        lib_1.objCopySingle(obj, this);
    }
}
exports.ObjCompromise = ObjCompromise;
var ObjCompromiseProto = function () { };
ObjCompromiseProto.prototype = Object.prototype;
ObjCompromise.prototype = lib_1.objAssignSingle(new ObjCompromiseProto(), {
    constructor: Object.prototype.constructor,
    all: function (a, b, c, d, e, f, g, h) {
        if (arguments.length < 3) {
            return ObjCompromise.prototype.set.call(this, a, b);
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
                    self = root = mutableCurrent = new ObjCompromise(this);
                }
                else {
                    self = root = mutableCurrent || new ObjCompromise(this);
                }
            }
            else {
                self = root;
            }
            for (j = 0, m = lib_1.Context.getSetKeysCache.length - 1; j < m; j++) {
                var v = self[lib_1.Context.getSetKeysCache[j]];
                if (v && typeof v === "object") {
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
            self = root = mutableCurrent = new ObjCompromise(this);
        }
        else {
            self = root = mutableCurrent || new ObjCompromise(this);
        }
        for (i = 0, l = lib_1.Context.getSetKeysCache.length - 1; i < l; i++) {
            var v = self[lib_1.Context.getSetKeysCache[i]];
            self = self[lib_1.Context.getSetKeysCache[i]] = (v && typeof v === "object") ? lib_1.arrObjClone(v) : {};
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
    isObj: function (val) { return val instanceof ObjCompromise; },
});
exports.isObj = ObjCompromise.prototype.isObj;
