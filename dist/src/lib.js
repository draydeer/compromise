"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            patch[i] = v && typeof v === 'object' ? arrObjClone(source[i]) : v;
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
            patch[k] = v && typeof v === 'object' ? arrObjClone(source[k]) : v;
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
    if (Array.isArray(source)) {
        var i = void 0, l = void 0, v = void 0;
        for (i = 0, l = source.length; i < l; i++) {
            v = source[i];
            if (v && typeof v === 'object' && false === Object.isFrozen(v)) {
                arrObjFreeze(v);
            }
        }
        if (false === Object.isFrozen(source)) {
            Object.freeze(source);
        }
    }
    else if (source && typeof source === 'object') {
        var i = void 0, l = void 0, k = void 0, keys = Object.keys(source), v = void 0;
        for (i = 0, l = keys.length, k = keys[0]; i < l; i++, k = keys[i]) {
            v = source[k];
            if (v && typeof v === 'object' && false === Object.isFrozen(v)) {
                arrObjFreeze(v);
            }
        }
        if (false === Object.isFrozen(source)) {
            Object.freeze(source);
        }
    }
    return source;
}
exports.arrObjFreeze = arrObjFreeze;
var Context;
(function (Context) {
    Context.getSetKeysCache = [];
    Context.isDevMode = process ? process.env.NODE_ENV === 'dev' : window['COMPROMISE_ENV'] === true;
})(Context = exports.Context || (exports.Context = {}));
function anyGetInContext(key, def) {
    var self = this;
    var keys = Context.getSetKeysCache = key instanceof Array ? key : key.split(".");
    var i, l;
    for (i = 0, l = keys.length - 1; i < l; i++) {
        var v = self[keys[i]];
        if (v && typeof v === "object") {
            self = v;
        }
        else {
            return def;
        }
    }
    return keys[i] in self ? self[keys[i]] : def;
}
exports.anyGetInContext = anyGetInContext;
