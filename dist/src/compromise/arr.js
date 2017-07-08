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
exports.ArrCompromise = function (arr) {
    if (arr) {
        lib_2.arrCopySingle(arr, this);
    }
};
var ArrCompromiseProto = function () { };
ArrCompromiseProto.prototype = Array.prototype;
exports.ArrCompromise.prototype = lib_1.objAssignSingle(new ArrCompromiseProto(), {
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
                    self = root = mutable = new exports.ArrCompromise(this);
                }
                else {
                    self = root = mutable || new exports.ArrCompromise(this);
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
        if (mutable === true) {
            self = root = mutable = new exports.ArrCompromise(this);
        }
        else {
            self = root = mutable || new exports.ArrCompromise(this);
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
        mutable = true;
        var result = callback(this);
        mutable = null;
        return result;
    },
    deleteIndex: function (index) {
        if (index !== void 0 && index < this.length && index > -1) {
            if (mutable) {
                var i_1, l_1;
                if (mutable === true) {
                    mutable = new exports.ArrCompromise(this);
                }
                mutable[index] = null;
                for (i_1 = index, l_1 = this.length - 1; i_1 < l_1; i_1++) {
                    mutable[i_1] = mutable[i_1 + 1];
                }
                Array.prototype.pop.call(mutable);
                return mutable;
            }
            var copy = new exports.ArrCompromise(this), i = void 0, l = void 0;
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
            if (mutable) {
                var i_2, l_2;
                if (mutable === true) {
                    mutable = new exports.ArrCompromise(this);
                }
                Array.prototype.push.call(mutable, null);
                for (i_2 = this.length - 1, l_2 = index; i_2 >= l_2; i_2--) {
                    mutable[i_2 + 1] = mutable[i_2];
                }
                mutable[index] = value;
                return mutable;
            }
            var copy = new exports.ArrCompromise(this), i = void 0, l = void 0;
            Array.prototype.push.call(copy, null);
            for (i = this.length - 1, l = index; i >= l; i--) {
                copy[i + 1] = copy[i];
            }
            copy[index] = value;
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
    toJSON: function () {
        var i, l, json = '[';
        for (i = 0, l = this.length; i < l; i++) {
            json += JSON.stringify(this[i]);
            if (i < l - 1) {
                json += ',';
            }
        }
        return json + ']';
    },
    unshift: function (a, b, c, d, e, f, g, h) {
        if (mutable) {
            if (mutable === true) {
                mutable = new exports.ArrCompromise(this);
            }
            return [mutable, Array.prototype.unshift.apply(mutable, arguments)];
        }
        var copy = new exports.ArrCompromise(this);
        var result = Array.prototype.unshift.apply(copy, arguments);
        return [copy, result];
    },
});
exports.isArr = exports.ArrCompromise.prototype.isArr;
