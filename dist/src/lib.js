"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const");
function arrAssignArrayLike(target, a, b, c, d, e, f, g, h) {
    var i, j, l, m, length;
    for (i = 1, l = arguments.length, length = 0; i < l; i++) {
        var argv = arguments[i];
        if (argv && argv.length) {
            for (j = 0, m = argv.length; j < m; j++, length++) {
                target[length] = argv[j];
            }
        }
    }
    target.length = length;
    return target;
}
exports.arrAssignArrayLike = arrAssignArrayLike;
function arrAssignArrayLikeSingle(target, source) {
    var i, l;
    for (i = 0, l = target.length = source.length; i < l; i++) {
        target[i] = source[i];
    }
    return target;
}
exports.arrAssignArrayLikeSingle = arrAssignArrayLikeSingle;
function arrCopySingle(source, ctx) {
    var i, l, target = ctx || new Array(source.length);
    for (i = 0, l = ctx ? ctx.length = source.length : source.length; i < l; i++) {
        target[i] = source[i];
    }
    return target;
}
exports.arrCopySingle = arrCopySingle;
function arrMerge(a, b, c, d, e, f, g, h) {
    var i, j, l, m, target = [];
    for (i = 0, l = arguments.length; i < l; i++) {
        var argv = arguments[i];
        if (argv && argv.length) {
            for (j = 0, m = argv.length; j < m; j++) {
                target.push(argv[j]);
            }
        }
    }
    return target;
}
exports.arrMerge = arrMerge;
function arrPatchCompare(target, source) {
    var i, l, patch = {};
    for (i = 0, l = source.length; i <= l; i++) {
        var v = source[i];
        if (v !== target[i]) {
            patch[i] = v && typeof v === const_1.OBJECT ? arrObjClone(source[i]) : v;
        }
    }
    return patch;
}
exports.arrPatchCompare = arrPatchCompare;
function objAssign(target, a, b, c, d, e, f, g, h) {
    var i, j, k, l, m;
    for (i = 1, l = arguments.length; i < l; i++) {
        var argv = arguments[i];
        if (argv) {
            var keys = Object.keys(argv);
            for (j = 1, k = keys[0], m = keys.length; j <= m; k = keys[j++]) {
                target[k] = argv[k];
            }
        }
    }
    return target;
}
exports.objAssign = objAssign;
function objAssignSingle(target, source) {
    var i, l, k, keys = Object.keys(source);
    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i++]) {
        target[k] = source[k];
    }
    return target;
}
exports.objAssignSingle = objAssignSingle;
function objCopySingle(source, ctx) {
    var i, l, k, keys = Object.keys(source), target = ctx || {};
    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i++]) {
        target[k] = source[k];
    }
    return target;
}
exports.objCopySingle = objCopySingle;
function objMerge(a, b, c, d, e, f, g, h) {
    var i, j, l, k, m, target = {};
    for (i = 0, l = arguments.length; i < l; i++) {
        var argv = arguments[i];
        if (argv) {
            var keys = Object.keys(argv);
            for (j = 1, k = keys[0], m = keys.length; j <= m; k = keys[j++]) {
                target[k] = argv[k];
            }
        }
    }
    return target;
}
exports.objMerge = objMerge;
function objPatchCompare(target, source) {
    var i, l, k, keys = Object.keys(source), patch = {};
    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i++]) {
        var v = source[k];
        if (v !== target[k]) {
            patch[k] = v && typeof v === const_1.OBJECT ? arrObjClone(source[k]) : v;
        }
    }
    return patch;
}
exports.objPatchCompare = objPatchCompare;
function arrObjClone(source) {
    return source instanceof Array ? arrCopySingle(source) : objCopySingle(source);
}
exports.arrObjClone = arrObjClone;
function arrObjFreeze(source) {
    if (source) {
        if (Array.isArray(source)) {
            var i = void 0, l = void 0, v = void 0;
            for (i = 0, l = source.length; i < l; i++) {
                v = source[i];
                if (v && typeof v === const_1.OBJECT && false === Object.isFrozen(v)) {
                    arrObjFreeze(v);
                }
            }
            if (false === Object.isFrozen(source)) {
                Object.freeze(source);
            }
        }
        else {
            var i = void 0, l = void 0, k = void 0, keys = Object.keys(source), v = void 0;
            for (i = 0, l = keys.length, k = keys[0]; i < l; i++, k = keys[i]) {
                v = source[k];
                if (v && typeof v === const_1.OBJECT && false === Object.isFrozen(v)) {
                    arrObjFreeze(v);
                }
            }
            if (false === Object.isFrozen(source)) {
                Object.freeze(source);
            }
        }
    }
    return source;
}
exports.arrObjFreeze = arrObjFreeze;
var Context;
(function (Context) {
    Context.getSetKeysCache = [];
    Context.isDevMode = process ? process.env.NODE_ENV === 'dev' : window['INVARY_ENV'] === 'dev';
})(Context = exports.Context || (exports.Context = {}));
function anyGetInContext(key, def) {
    var self = this;
    var keys = Context.getSetKeysCache = key instanceof Array ? key : key.split(".");
    var i, l;
    for (i = 0, l = keys.length - 1; i < l; i++) {
        var v = self[keys[i]];
        if (v && typeof v === const_1.OBJECT) {
            self = v;
        }
        else {
            return def;
        }
    }
    return keys[i] in self ? self[keys[i]] : def;
}
exports.anyGetInContext = anyGetInContext;
function specialize(copier) {
    var copySet = new Set();
    function set(ctx, key, val) {
        if (anyGetInContext.call(ctx, key) === val) {
            return ctx;
        }
        return setDirect(ctx, key, val);
    }
    function setInContext(key, val) {
        if (anyGetInContext.call(this, key) === val) {
            return this;
        }
        return setDirect(this, key, val);
    }
    function setDirect(ctx, key, val) {
        var root, self = root = copier(ctx);
        var i, l;
        for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i++) {
            var v = self[Context.getSetKeysCache[i]];
            self = self[Context.getSetKeysCache[i]] = (v && typeof v === const_1.OBJECT) ? arrObjClone(v) : {};
        }
        self[Context.getSetKeysCache[i]] = val;
        Context.getSetKeysCache = null;
        return root;
    }
    function setDirectMutable(ctx, key, val) {
        var self = ctx;
        var i, l;
        for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i++) {
            var v = self[Context.getSetKeysCache[i]];
            self = self[Context.getSetKeysCache[i]] = (v && typeof v === const_1.OBJECT) ? v : {};
        }
        self[Context.getSetKeysCache[i]] = val;
        Context.getSetKeysCache = null;
        return ctx;
    }
    function setPatch(ctx, key, val) {
        if (anyGetInContext.call(ctx, key) === val) {
            return {};
        }
        var root, self = root = (_a = {}, _a[Context.getSetKeysCache[0]] = ctx[Context.getSetKeysCache[0]], _a);
        var i, l;
        for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i++) {
            var v = self[Context.getSetKeysCache[i]];
            self = self[Context.getSetKeysCache[i]] = (v && typeof v === const_1.OBJECT) ? arrObjClone(v) : {};
        }
        self[Context.getSetKeysCache[i]] = val;
        Context.getSetKeysCache = null;
        return root;
        var _a;
    }
    function all(ctx, a, b, c, d, e, f, g, h) {
        if (arguments.length < 4) {
            return set(ctx, a, b);
        }
        var root = ctx;
        var self;
        var i, j, l, m;
        copySet.clear();
        for (i = 1, l = arguments.length; i < l; i += 2) {
            if (anyGetInContext.call(ctx, arguments[i]) === arguments[i + 1]) {
                continue;
            }
            if (root === ctx) {
                self = root = copier(ctx);
            }
            else {
                self = root;
            }
            for (j = 0, m = Context.getSetKeysCache.length - 1; j < m; j++) {
                var v = self[Context.getSetKeysCache[j]];
                if (v && typeof v === const_1.OBJECT) {
                    if (false === copySet.has(v)) {
                        self = self[Context.getSetKeysCache[j]] = arrObjClone(v);
                        copySet.add(self);
                    }
                    else {
                        self = v;
                    }
                }
                else {
                    self = self[Context.getSetKeysCache[j]] = {};
                }
            }
            self[Context.getSetKeysCache[j]] = arguments[i + 1];
        }
        Context.getSetKeysCache = null;
        return root;
    }
    function allPatch(ctx, a, b, c, d, e, f, g, h) {
        if (arguments.length < 4) {
            return setPatch(ctx, a, b);
        }
        var root = {};
        var self;
        var i, j, l, m;
        copySet.clear();
        for (i = 1, l = arguments.length; i < l; i += 2) {
            if (anyGetInContext.call(ctx, arguments[i]) === arguments[i + 1]) {
                continue;
            }
            self = root;
            if (false === Context.getSetKeysCache[0] in self) {
                self[Context.getSetKeysCache[0]] = ctx[Context.getSetKeysCache[0]];
            }
            for (j = 0, m = Context.getSetKeysCache.length - 1; j < m; j++) {
                var v = self[Context.getSetKeysCache[j]];
                if (v && typeof v === const_1.OBJECT) {
                    if (false === copySet.has(v)) {
                        self = self[Context.getSetKeysCache[j]] = arrObjClone(v);
                        copySet.add(self);
                    }
                    else {
                        self = v;
                    }
                }
                else {
                    self = self[Context.getSetKeysCache[j]] = {};
                }
            }
            self[Context.getSetKeysCache[j]] = arguments[i + 1];
        }
        Context.getSetKeysCache = null;
        return root;
    }
    return {
        set: set,
        setInContext: setInContext,
        setDirect: setDirect,
        setDirectMutable: setDirectMutable,
        setPatch: setPatch,
        all: all,
        allPatch: allPatch,
    };
}
exports.specialize = specialize;
