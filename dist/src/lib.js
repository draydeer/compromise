"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrAssignArrayLike = function (target, a, b, c, d, e, f, g, h) {
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
};
exports.arrAssignArrayLikeSingle = function (target, source) {
    var i, l;
    for (i = 0, l = target.length = source.length; i < l; i++) {
        target[i] = source[i];
    }
    return target;
};
exports.arrCopySingle = function (source, target) {
    var i, l, target = target || [];
    for (i = 0, l = source.length; i < l; i++) {
        Array.prototype.push.call(target, source[i]);
    }
    return target;
};
exports.arrMerge = function (a, b, c, d, e, f, g, h) {
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
};
exports.arrPatchCompare = function (target, source) {
    var i, l, patch = {};
    for (i = 0, l = source.length; i <= l; i++) {
        if (source[i] !== target[i]) {
            patch[i] = exports.arrObjClone(source[i]);
        }
    }
    return patch;
};
exports.objAssign = function (target, a, b, c, d, e, f, g, h) {
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
};
exports.objAssignSingle = function (target, source) {
    var i, l, k, keys = Object.keys(source);
    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i++]) {
        target[k] = source[k];
    }
    return target;
};
exports.objCopySingle = function (source, target) {
    var i, l, k, keys = Object.keys(source), target = target || {};
    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i++]) {
        target[k] = source[k];
    }
    return target;
};
exports.objMerge = function (a, b, c, d, e, f, g, h) {
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
};
exports.objPatchCompare = function (target, source) {
    var i, l, k, keys = Object.keys(source), patch = {};
    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i++]) {
        if (source[k] !== target[k]) {
            patch[k] = exports.arrObjClone(source[k]);
        }
    }
    return patch;
};
exports.arrObjClone = function (source) {
    if (source instanceof Array) {
        return exports.arrCopySingle(source);
    }
    return exports.objCopySingle(source);
};
var Context;
(function (Context) {
    Context.getSetKeysCache = [];
})(Context = exports.Context || (exports.Context = {}));
exports.anyGetInContext = function (key, def) {
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
};
