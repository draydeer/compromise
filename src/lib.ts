
export const arrFastCombine = function (a?, b?, c?, d?, e?, f?, g?, h?): any {
    const target = new Array(Array.prototype.reduce.call(arguments, function (a, b) { return a + b.length; }, 0));

    let offset = 0;

    for (var i = 0, l = arguments.length; i < l; i ++) {
        const argv = arguments[i];

        if (argv && argv.length) {
            for (var j = 0, m = argv.length; j < m; j ++, offset ++) {
                target[offset] = argv[j];
            }
        }
    }

    return target;
};

export const objFastCombine = function (a?, b?, c?, d?, e?, f?, g?, h?): any {
    const target = {};

    for (var i = 0, l = arguments.length; i < l; i ++) {
        const argv = arguments[i];

        if (argv) {
            const keys = Object.keys(argv);

            for (var j = 1, k = keys[0], m = keys.length; j <= m; k = keys[j ++]) {
                target[k] = argv[k];
            }
        }
    }

    return target;
};

let arrFastCopyArrayLikeIndexCache;

export const arrFastCopyArrayLike = function (target, a?, b?, c?, d?, e?, f?, g?, h?): any {
    arrFastCopyArrayLikeIndexCache = 0;

    for (var i = 1, l = arguments.length; i < l; i ++) {
        const argv = arguments[i];

        if (argv && argv.length) {
            for (var j = 0, m = argv.length; j < m; j ++, arrFastCopyArrayLikeIndexCache ++) {
                target[arrFastCopyArrayLikeIndexCache] = argv[j];
            }
        }
    }

    target.length = arrFastCopyArrayLikeIndexCache;

    return this;
};

export const objFastCopy = function (target, a?, b?, c?, d?, e?, f?, g?, h?): any {
    for (var i = 1, l = arguments.length; i < l; i ++) {
        const argv = arguments[i];

        if (argv) {
            const keys = Object.keys(argv);

            for (var j = 1, k = keys[0], m = keys.length; j <= m; k = keys[j ++]) {
                target[k] = argv[k];
            }
        }
    }

    return target;
};

export const arrObjClone = function (source: any): any {
    if (source instanceof Array) {
        return arrFastCopyArrayLike([], source);
    }

    return objFastCopy({}, source);
};
