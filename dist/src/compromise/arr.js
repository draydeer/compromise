"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../lib");
var lib_2 = require("../lib");
exports.Arr = function (value, force) {
    return value instanceof exports.ArrCompromise && !force ? value : new exports.ArrCompromise(value);
};
var copySet = new Set();
exports.arrSetInContext = function (key, val) {
    if (lib_1.anyGetInContext.call(this, key) === val) {
        return this;
    }
    var root, self = root = lib_2.arrCopySingle(this);
    var i, l;
    for (i = 0, l = lib_1.Context.getSetKeysCache.length - 1; i < l; i++) {
        var v = self[lib_1.Context.getSetKeysCache[i]];
        self = self[lib_1.Context.getSetKeysCache[i]] = (v && typeof v === "object") ? lib_1.arrObjClone(v) : {};
    }
    self[lib_1.Context.getSetKeysCache[i]] = val;
    lib_1.Context.getSetKeysCache = null;
    return root;
};
exports.arrSetInContextPatch = function (key, val) {
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
exports.arrAll = function (ctx, a, b, c, d, e, f, g, h) {
    if (arguments.length < 4) {
        return exports.ArrCompromise.prototype.set.call(ctx, a, b);
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
            self = root = new exports.ArrCompromise(ctx);
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
exports.arrAllPatch = function (ctx, a, b, c, d, e, f, g, h) {
    if (arguments.length < 4) {
        return exports.arrSetInContextPatch.call(ctx, a, b);
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
            self = root = (_a = {}, _a[lib_1.Context.getSetKeysCache[0]] = ctx[lib_1.Context.getSetKeysCache[0]], _a);
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
var mutable = null;
exports.ArrCompromise = function (value) {
    Array.prototype.constructor.call(this);
    value ? lib_1.arrAssignArrayLike(this, value) : this.length = 0;
};
var ArrCompromiseProto = function () { };
ArrCompromiseProto.prototype = Array.prototype;
exports.ArrCompromise.prototype = lib_1.objAssign(new ArrCompromiseProto(), {
    constructor: Array.prototype.constructor,
    all: function (a, b, c, d, e, f, g, h) {
        if (arguments.length < 3) {
            return exports.ArrCompromise.prototype.set.call(this, a, b);
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
                if (mutable === true) {
                    mutable = new exports.ArrCompromise(this);
                }
                self = root = mutable || new exports.ArrCompromise(this);
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
    set: function (key, val) {
        if (lib_1.anyGetInContext.call(this, key) === val) {
            return this;
        }
        if (mutable === true) {
            mutable = new exports.ArrCompromise(this);
        }
        var root, self = root = mutable || new exports.ArrCompromise(this);
        var i, l;
        for (i = 0, l = lib_1.Context.getSetKeysCache.length - 1; i < l; i++) {
            var v = self[lib_1.Context.getSetKeysCache[i]];
            self = self[lib_1.Context.getSetKeysCache[i]] = (v && typeof v === "object") ? lib_1.arrObjClone(v) : {};
        }
        self[lib_1.Context.getSetKeysCache[i]] = val;
        lib_1.Context.getSetKeysCache = null;
        return root;
    },
    bulk: function (callback) {
        mutable = true;
        var result = callback(this);
        mutable = null;
        return result;
    },
    deleteIndex: function (index) {
        if (index !== void 0 && index < this.length) {
            if (mutable) {
                if (mutable === true) {
                    mutable = new exports.ArrCompromise(this);
                }
                mutable.splice(index, 1);
                return mutable;
            }
            var copy = new exports.ArrCompromise(), i = void 0, l = void 0;
            for (i = 0, l = this.length; i < l; i++) {
                if (i !== index) {
                    Array.prototype.push.call(copy, this[i]);
                }
            }
            return copy;
        }
        return this;
    },
    insertIndex: function (index, value) {
        if (index !== void 0 && index < this.length) {
            if (mutable) {
                if (mutable === true) {
                    mutable = new exports.ArrCompromise(this);
                }
                mutable.splice(index, 0, value);
                return mutable;
            }
            var copy = new exports.ArrCompromise(), i = void 0, l = void 0;
            for (i = 0, l = this.length; i < l; i++) {
                i === index && Array.prototype.push.call(copy, value);
                Array.prototype.push.call(copy, this[i]);
            }
            return copy;
        }
        return this;
    },
    isArr: function (val) { return val instanceof exports.ArrCompromise; },
    pop: function () {
        if (mutable) {
            if (mutable === true) {
                mutable = new exports.ArrCompromise(this);
            }
            return [mutable, Array.prototype.pop.apply(mutable)];
        }
        var copy = new exports.ArrCompromise(this);
        var result = Array.prototype.pop.apply(copy);
        return [copy, result];
    },
    push: function (a, b, c, d, e, f, g, h) {
        if (mutable) {
            if (mutable === true) {
                mutable = new exports.ArrCompromise(this);
            }
            return [mutable, Array.prototype.push.apply(mutable, arguments)];
        }
        var copy = new exports.ArrCompromise(this);
        var result = Array.prototype.push.apply(copy, arguments);
        return [copy, result];
    },
    slice: function (begin, end) {
        return new exports.ArrCompromise(this.slice(begin, end));
    },
    shift: function () {
        if (mutable) {
            if (mutable === true) {
                mutable = new exports.ArrCompromise(this);
            }
            return [mutable, Array.prototype.shift.apply(mutable)];
        }
        var copy = new exports.ArrCompromise(this);
        var result = Array.prototype.shift.apply(copy);
        return [copy, result];
    },
    unshift: function (a, b, c, d, e, f, g, h) {
        if (mutable) {
            if (mutable === true) {
                mutable = new exports.ArrCompromise(this);
            }
            return [mutable, Array.prototype.unshift.apply(mutable)];
        }
        var copy = new exports.ArrCompromise(this);
        var result = Array.prototype.unshift.apply(copy, arguments);
        return [copy, result];
    },
});
exports.isArr = exports.ArrCompromise.prototype.isArr;
