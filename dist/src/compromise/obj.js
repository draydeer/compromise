"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
exports.Obj = function (value, force) {
    return value instanceof ObjCompromise && !force ? value : new ObjCompromise(value);
};
var copySet = new Set();
exports.objSetInContext = function (key, val) {
    if (lib_1.anyGetInContext.call(this, key) === val) {
        return this;
    }
    var root, self = root = new ObjCompromise(this);
    var i, l;
    for (i = 0, l = lib_1.Context.getSetKeysCache.length - 1; i < l; i++) {
        var v = self[lib_1.Context.getSetKeysCache[i]];
        self = self[lib_1.Context.getSetKeysCache[i]] = (v && typeof v === "object") ? lib_1.arrObjClone(v) : v;
    }
    self[lib_1.Context.getSetKeysCache[i]] = val;
    lib_1.Context.getSetKeysCache = null;
    return root;
};
exports.objSetInContextPatch = function (key, val) {
    if (lib_1.anyGetInContext.call(this, key) === val) {
        return {};
    }
    var root, self = root = (_a = {}, _a[lib_1.Context.getSetKeysCache[0]] = this[lib_1.Context.getSetKeysCache[0]], _a);
    var i, l;
    for (i = 0, l = lib_1.Context.getSetKeysCache.length - 1; i < l; i++) {
        var v = self[lib_1.Context.getSetKeysCache[i]];
        self = self[lib_1.Context.getSetKeysCache[i]] = (v && typeof v === "object") ? lib_1.arrObjClone(v) : v;
    }
    self[lib_1.Context.getSetKeysCache[i]] = val;
    lib_1.Context.getSetKeysCache = null;
    return root;
    var _a;
};
exports.objAll = function (ctx, a, b, c, d, e, f, g, h) {
    if (arguments.length < 4) {
        return ObjCompromise.prototype.set.call(ctx, a, b);
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
            self = root = new ObjCompromise((_a = {}, _a[lib_1.Context.getSetKeysCache[0]] = ctx[lib_1.Context.getSetKeysCache[0]], _a));
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
                    self = self[lib_1.Context.getSetKeysCache[j]] = v;
                }
            }
            else {
                self = self[lib_1.Context.getSetKeysCache[j]] = v;
            }
        }
        self[lib_1.Context.getSetKeysCache[j]] = arguments[i + 1];
    }
    lib_1.Context.getSetKeysCache = null;
    return root;
    var _a;
};
exports.objAllPatch = function (ctx, a, b, c, d, e, f, g, h) {
    if (arguments.length < 4) {
        return exports.objSetInContextPatch.call(ctx, a, b);
    }
    var root = {};
    var self;
    var i, j, l, m;
    copySet.clear();
    for (i = 1, l = arguments.length; i < l; i += 2) {
        if (lib_1.anyGetInContext.call(ctx, arguments[i]) === arguments[i + 1]) {
            continue;
        }
        if (root === ctx) {
            self = root = {};
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
                    self = self[lib_1.Context.getSetKeysCache[j]] = v;
                }
            }
            else {
                self = self[lib_1.Context.getSetKeysCache[j]] = v;
            }
        }
        self[lib_1.Context.getSetKeysCache[j]] = arguments[i + 1];
    }
    lib_1.Context.getSetKeysCache = null;
    return root;
};
var ObjCompromise = function (value) {
    value && lib_1.objFastCopy(this, value);
};
var ObjCompromiseProto = function () { };
ObjCompromiseProto.prototype = Object.prototype;
ObjCompromise.prototype = lib_1.objFastCopy(new ObjCompromiseProto(), {
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
                self = root = new ObjCompromise(this);
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
                        self = self[lib_1.Context.getSetKeysCache[j]] = v;
                    }
                }
                else {
                    self = self[lib_1.Context.getSetKeysCache[j]] = v;
                }
            }
            self[lib_1.Context.getSetKeysCache[j]] = arguments[i + 1];
        }
        lib_1.Context.getSetKeysCache = null;
        return root;
    },
    get: lib_1.anyGetInContext,
    set: exports.objSetInContext,
    isObj: function (val) { return val instanceof ObjCompromise; },
});
exports.isObj = ObjCompromise.prototype.isObj;
