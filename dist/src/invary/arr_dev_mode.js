"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var lib_2 = require("../lib");
exports.Arr = function (value) {
    return new ArrInvary(value);
};
var copySet = new Set();
var specialized = lib_2.specialize(lib_1.arrCopySingle);
exports.arrSet = specialized.set;
exports.arrSetPatch = specialized.setPatch;
exports.arrAll = specialized.all;
exports.arrAllPatch = specialized.allPatch;
var mutables = new Array(32);
var mutableCurrent = false;
var mutableDevMode = lib_1.Context.isDevMode;
var mutableIndex = 0;
function ArrInvary(arr, noFreeze) {
    if (arr) {
        lib_1.arrCopySingle(arr, this);
    }
    if (true !== noFreeze) {
        lib_1.arrObjFreeze(this);
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
                    self = root = mutableCurrent = new ArrInvary(this, true);
                }
                else {
                    self = root = mutableCurrent || new ArrInvary(this, true);
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
                        self = self[lib_1.Context.getSetKeysCache[j]] = v;
                    }
                }
                else {
                    self = self[lib_1.Context.getSetKeysCache[j]] = {};
                }
            }
            self[lib_1.Context.getSetKeysCache[j]] = arguments[i + 1];
        }
        if (!mutableCurrent) {
            root.freeze();
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
            self = root = mutableCurrent = new ArrInvary(this, true);
        }
        else {
            self = root = mutableCurrent || new ArrInvary(this, true);
        }
        for (i = 0, l = lib_1.Context.getSetKeysCache.length - 1; i < l; i++) {
            var v = self[lib_1.Context.getSetKeysCache[i]];
            self = self[lib_1.Context.getSetKeysCache[i]] = (v && typeof v === "object") ? lib_1.arrObjClone(v) : {};
        }
        self[lib_1.Context.getSetKeysCache[i]] = val;
        if (!mutableCurrent) {
            root.freeze();
        }
        lib_1.Context.getSetKeysCache = null;
        return root;
    },
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
    deleteIndex: function (index) {
        if (index !== void 0 && index < this.length && index > -1) {
            if (mutableCurrent) {
                var i_1, l_1;
                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this, true);
                }
                mutableCurrent[index] = null;
                for (i_1 = index, l_1 = this.length - 1; i_1 < l_1; i_1++) {
                    mutableCurrent[i_1] = mutableCurrent[i_1 + 1];
                }
                Array.prototype.pop.call(mutableCurrent);
                return mutableCurrent;
            }
            var copy = new ArrInvary(this, true), i = void 0, l = void 0;
            copy[index] = null;
            for (i = index, l = this.length - 1; i < l; i++) {
                copy[i] = copy[i + 1];
            }
            Array.prototype.pop.call(copy);
            copy.freeze();
            return copy;
        }
        return this;
    },
    insertIndex: function (index, value) {
        if (index !== void 0 && index < this.length && index > -1) {
            if (mutableCurrent) {
                var i_2, l_2;
                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this, true);
                }
                Array.prototype.push.call(mutableCurrent, null);
                for (i_2 = this.length - 1, l_2 = index; i_2 >= l_2; i_2--) {
                    mutableCurrent[i_2 + 1] = mutableCurrent[i_2];
                }
                mutableCurrent[index] = value;
                return mutableCurrent;
            }
            var copy = new ArrInvary(this, true), i = void 0, l = void 0;
            Array.prototype.push.call(copy, null);
            for (i = this.length - 1, l = index; i >= l; i--) {
                copy[i + 1] = copy[i];
            }
            copy[index] = value;
            copy.freeze();
            return copy;
        }
        return this;
    },
    isArr: function (val) { return val instanceof ArrInvary; },
    pop: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this, true);
            }
            return [mutableCurrent, Array.prototype.pop.apply(mutableCurrent)];
        }
        var copy = new ArrInvary(this, true);
        var result = Array.prototype.pop.apply(copy);
        copy.freeze();
        return [copy, result];
    },
    push: function (a, b, c, d, e, f, g, h) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this, true);
            }
            return [mutableCurrent, Array.prototype.push.apply(mutableCurrent, arguments)];
        }
        var copy = new ArrInvary(this, true);
        var result = Array.prototype.push.apply(copy, arguments);
        copy.freeze();
        return [copy, result];
    },
    slice: function (begin, end) {
        return new ArrInvary(Array.prototype.slice.call(this, begin, end));
    },
    shift: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this, true);
            }
            return [mutableCurrent, Array.prototype.shift.apply(mutableCurrent)];
        }
        var copy = new ArrInvary(this, true);
        var result = Array.prototype.shift.apply(copy);
        if (!mutableCurrent) {
            copy.freeze();
        }
        return [copy, result];
    },
    toJSON: function () {
        return Array.prototype.constructor.apply(this, this);
    },
    unshift: function (a, b, c, d, e, f, g, h) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this, true);
            }
            return [mutableCurrent, Array.prototype.unshift.apply(mutableCurrent, arguments)];
        }
        var copy = new ArrInvary(this, true);
        var result = Array.prototype.unshift.apply(copy, arguments);
        copy.freeze();
        return [copy, result];
    },
});
exports.isArr = ArrInvary.prototype.isArr;
