(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    exports.arrFastCombine = function (a, b, c, d, e, f, g, h) {
        var target = new Array(Array.prototype.reduce.call(arguments, function (a, b) { return a + b.length; }, 0));
        var offset = 0;
        for (var i = 0, l = arguments.length; i < l; i++) {
            var argv = arguments[i];
            if (argv && argv.length) {
                for (var j = 0, m = argv.length; j < m; j++, offset++) {
                    target[offset] = argv[j];
                }
            }
        }
        return target;
    };
    exports.objFastCombine = function (a, b, c, d, e, f, g, h) {
        var target = {};
        for (var i = 0, l = arguments.length; i < l; i++) {
            var argv = arguments[i];
            if (argv) {
                var keys = Object.keys(argv);
                for (var j = 1, k = keys[0], m = keys.length; j <= m; k = keys[j++]) {
                    target[k] = argv[k];
                }
            }
        }
        return target;
    };
    var arrFastCopyArrayLikeIndexCache;
    exports.arrFastCopyArrayLike = function (target, a, b, c, d, e, f, g, h) {
        arrFastCopyArrayLikeIndexCache = 0;
        for (var i = 1, l = arguments.length; i < l; i++) {
            var argv = arguments[i];
            if (argv && argv.length) {
                for (var j = 0, m = argv.length; j < m; j++, arrFastCopyArrayLikeIndexCache++) {
                    target[arrFastCopyArrayLikeIndexCache] = argv[j];
                }
            }
        }
        target.length = arrFastCopyArrayLikeIndexCache;
        return this;
    };
    exports.objFastCopy = function (target, a, b, c, d, e, f, g, h) {
        for (var i = 1, l = arguments.length; i < l; i++) {
            var argv = arguments[i];
            if (argv) {
                var keys = Object.keys(argv);
                for (var j = 1, k = keys[0], m = keys.length; j <= m; k = keys[j++]) {
                    target[k] = argv[k];
                }
            }
        }
        return target;
    };
    exports.arrObjClone = function (source) {
        if (source instanceof Array) {
            return exports.arrFastCopyArrayLike([], source);
        }
        return exports.objFastCopy({}, source);
    };
});
