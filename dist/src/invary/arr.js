"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var const_1 = require("../const");
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
            self = root = mutableCurrent = new ArrInvary(this);
        }
        else {
            self = root = mutableCurrent || new ArrInvary(this);
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
    deleteIndex: function (ind) {
        if (ind !== void 0 && ind < this.length && ind > -1) {
            if (mutableCurrent) {
                var i_1, l_1;
                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this);
                }
                mutableCurrent[ind] = null;
                for (i_1 = ind, l_1 = this.length - 1; i_1 < l_1; i_1++) {
                    mutableCurrent[i_1] = mutableCurrent[i_1 + 1];
                }
                Array.prototype.pop.call(mutableCurrent);
                return mutableCurrent;
            }
            var copy = new ArrInvary(this), i = void 0, l = void 0;
            copy[ind] = null;
            for (i = ind, l = this.length - 1; i < l; i++) {
                copy[i] = copy[i + 1];
            }
            Array.prototype.pop.call(copy);
            return copy;
        }
        return this;
    },
    freeze: function () {
        return lib_1.arrObjFreeze(this);
    },
    insertIndex: function (ind, a, b, c, d, e, f, g, h) {
        if (ind !== void 0 && ind < this.length && ind > -1) {
            var countToInsert = arguments.length - 1;
            if (mutableCurrent) {
                var i_2, l_2;
                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this);
                }
                for (i_2 = 1; i_2 < countToInsert; i_2++) {
                    Array.prototype.push.call(mutableCurrent, null);
                }
                for (i_2 = this.length - countToInsert, l_2 = ind; i_2 >= l_2; i_2--) {
                    mutableCurrent[i_2 + countToInsert] = mutableCurrent[i_2];
                }
                for (i_2 = 1; i_2 < countToInsert; i_2++) {
                    mutableCurrent[ind++] = arguments[i_2];
                }
                return mutableCurrent;
            }
            var copy = new ArrInvary(this), i = void 0, l = void 0;
            for (i = 0; i < countToInsert; i++) {
                Array.prototype.push.call(copy, null);
            }
            for (i = this.length - countToInsert, l = ind; i >= l; i--) {
                copy[i + countToInsert] = copy[i];
            }
            for (i = 0; i < countToInsert; i++) {
                copy[ind++] = arguments[i + 1];
            }
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
    splice: function (start, deleteCount, a, b, c, d, e, f, g, h) {
        if (start !== void 0 && start < this.length && start > -1) {
        }
        return [this, []];
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
