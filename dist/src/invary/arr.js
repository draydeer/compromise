"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
exports.Arr = function (value) {
    return new ArrInvary(value);
};
var copySet = new Set();
function arrSet(ctx, key, val) {
    if (lib_1.anyGetInContext.call(ctx, key) === val) {
        return ctx;
    }
    var root, self = root = lib_1.arrCopySingle(ctx);
    var i, l;
    for (i = 0, l = lib_1.Context.getSetKeysCache.length - 1; i < l; i++) {
        var v = self[lib_1.Context.getSetKeysCache[i]];
        self = self[lib_1.Context.getSetKeysCache[i]] = (v && typeof v === "object") ? lib_1.arrObjClone(v) : {};
    }
    self[lib_1.Context.getSetKeysCache[i]] = val;
    lib_1.Context.getSetKeysCache = null;
    return root;
}
exports.arrSet = arrSet;
function arrSetPatch(ctx, key, val) {
    if (lib_1.anyGetInContext.call(ctx, key) === val) {
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
exports.arrSetPatch = arrSetPatch;
function arrAll(ctx, a, b, c, d, e, f, g, h) {
    if (arguments.length < 4) {
        return arrSet(ctx, a, b);
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
            self = root = lib_1.arrCopySingle(ctx);
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
exports.arrAll = arrAll;
function arrAllPatch(ctx, a, b, c, d, e, f, g, h) {
    if (arguments.length < 4) {
        return arrSetPatch(ctx, a, b);
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
exports.arrAllPatch = arrAllPatch;
var mutables = new Array(32);
var mutableCurrent = false;
var mutableIndex = 0;
function ArrInvary(arr) {
    if (arr) {
        lib_1.arrCopySingle(arr, this);
    }
}
exports.ArrInvary = ArrInvary;
var ArrInvaryProto = function () { };
ArrInvaryProto.prototype = Array.prototype;
ArrInvary.prototype = lib_1.objAssignSingle(new ArrInvaryProto(), {
    constructor: Array.prototype.constructor,
    all: function (a, b, c, d, e, f, g, h) {
        if (arguments.length < 3) {
            return this.set(a, b);
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
                    self = root = mutableCurrent = new ArrInvary(this);
                }
                else {
                    self = root = mutableCurrent || new ArrInvary(this);
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
            self = root = mutableCurrent = new ArrInvary(this);
        }
        else {
            self = root = mutableCurrent || new ArrInvary(this);
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
    deleteIndex: function (index) {
        if (index !== void 0 && index < this.length && index > -1) {
            if (mutableCurrent) {
                var i_1, l_1;
                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this);
                }
                mutableCurrent[index] = null;
                for (i_1 = index, l_1 = this.length - 1; i_1 < l_1; i_1++) {
                    mutableCurrent[i_1] = mutableCurrent[i_1 + 1];
                }
                Array.prototype.pop.call(mutableCurrent);
                return mutableCurrent;
            }
            var copy = new ArrInvary(this), i = void 0, l = void 0;
            copy[index] = null;
            for (i = index, l = this.length - 1; i < l; i++) {
                copy[i] = copy[i + 1];
            }
            Array.prototype.pop.call(copy);
            return copy;
        }
        return this;
    },
    insertIndex: function (index, value) {
        if (index !== void 0 && index < this.length && index > -1) {
            if (mutableCurrent) {
                var i_2, l_2;
                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this);
                }
                Array.prototype.push.call(mutableCurrent, null);
                for (i_2 = this.length - 1, l_2 = index; i_2 >= l_2; i_2--) {
                    mutableCurrent[i_2 + 1] = mutableCurrent[i_2];
                }
                mutableCurrent[index] = value;
                return mutableCurrent;
            }
            var copy = new ArrInvary(this), i = void 0, l = void 0;
            Array.prototype.push.call(copy, null);
            for (i = this.length - 1, l = index; i >= l; i--) {
                copy[i + 1] = copy[i];
            }
            copy[index] = value;
            return copy;
        }
        return this;
    },
    isArr: function (val) { return val instanceof ArrInvary; },
    pop: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }
            return [mutableCurrent, Array.prototype.pop.apply(mutableCurrent)];
        }
        var copy = new ArrInvary(this);
        var result = Array.prototype.pop.apply(copy);
        return [copy, result];
    },
    push: function (a, b, c, d, e, f, g, h) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }
            return [mutableCurrent, Array.prototype.push.apply(mutableCurrent, arguments)];
        }
        var copy = new ArrInvary(this);
        var result = Array.prototype.push.apply(copy, arguments);
        return [copy, result];
    },
    slice: function (begin, end) {
        return new ArrInvary(Array.prototype.slice.call(this, begin, end));
    },
    shift: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }
            return [mutableCurrent, Array.prototype.shift.apply(mutableCurrent)];
        }
        var copy = new ArrInvary(this);
        var result = Array.prototype.shift.apply(copy);
        return [copy, result];
    },
    toJSON: function () {
        return Array.prototype.constructor.apply(this, this);
    },
    unshift: function (a, b, c, d, e, f, g, h) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }
            return [mutableCurrent, Array.prototype.unshift.apply(mutableCurrent, arguments)];
        }
        var copy = new ArrInvary(this);
        var result = Array.prototype.unshift.apply(copy, arguments);
        return [copy, result];
    },
});
exports.isArr = ArrInvary.prototype.isArr;
