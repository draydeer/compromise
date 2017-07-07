export const arrAssignArrayLike = function (target, a?, b?, c?, d?, e?, f?, g?, h?): any {
    let i, j, l, m, length;

    for (i = 1, l = arguments.length, length = 0; i < l; i ++) {
        const argv = arguments[i];

        if (argv && argv.length) {
            for (j = 0, m = argv.length; j < m; j ++, length ++) {
                target[length] = argv[j];
            }
        }
    }

    target.length = length;

    return target;
};

export const arrAssignArrayLikeSingle = function (target, source) {
    let i, l;

    for (i = 0, l = target.length = source.length; i < l; i ++) {
        target[i] = source[i];
    }

    return target;
};

export const arrCopySingle = function (source, target?): any {
    let i, l, target = target || [];

    for (i = 0, l = source.length; i < l; i ++) {
        Array.prototype.push.call(target, source[i]);
    }

    return target;
};

export const arrMerge = function (a?, b?, c?, d?, e?, f?, g?, h?): any {
    let i, j, l, m, target = [];

    for (i = 0, l = arguments.length; i < l; i ++) {
        const argv = arguments[i];

        if (argv && argv.length) {
            for (j = 0, m = argv.length; j < m; j ++) {
                target.push(argv[j]);
            }
        }
    }

    return target;
};

export const arrPatchCompare = function (target, source): any {
    let i, l, patch = {};

    for (i = 0, l = source.length; i <= l; i ++) {
        if (source[i] !== target[i]) {
            patch[i] = arrObjClone(source[i]);
        }
    }

    return patch;
};

export const objAssign = function (target, a?, b?, c?, d?, e?, f?, g?, h?): any {
    let i, j, k, l, m;

    for (i = 1, l = arguments.length; i < l; i ++) {
        const argv = arguments[i];

        if (argv) {
            const keys = Object.keys(argv);

            for (j = 1, k = keys[0], m = keys.length; j <= m; k = keys[j ++]) {
                target[k] = argv[k];
            }
        }
    }

    return target;
};

export const objAssignSingle = function (target, source) {
    let i, l, k, keys = Object.keys(source);

    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i ++]) {
        target[k] = source[k];
    }

    return target;
};

export const objCopySingle = function (source, target?) {
    let i, l, k, keys = Object.keys(source), target = target || {};

    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i ++]) {
        target[k] = source[k];
    }

    return target;
};

export const objMerge = function (a?, b?, c?, d?, e?, f?, g?, h?): any {
    let i, j, l, k, m, target = {};

    for (i = 0, l = arguments.length; i < l; i ++) {
        const argv = arguments[i];

        if (argv) {
            const keys = Object.keys(argv);

            for (j = 1, k = keys[0], m = keys.length; j <= m; k = keys[j ++]) {
                target[k] = argv[k];
            }
        }
    }

    return target;
};

export const objPatchCompare = function (target, source): any {
    let i, l, k, keys = Object.keys(source), patch = {};

    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i ++]) {
        if (source[k] !== target[k]) {
            patch[k] = arrObjClone(source[k]);
        }
    }

    return patch;
};

export const arrObjClone = function (source: any): any {
    if (source instanceof Array) {
        return arrCopySingle(source);
    }

    return objCopySingle(source);
};

export module Context {
    export let getSetKeysCache = [];
}

export type TKey = string|(number|string)[];

export const anyGetInContext = function (key: TKey, def?: any) {
    let self = this;
    let keys = Context.getSetKeysCache = key instanceof Array ? key : (<string> key).split(".");
    let i, l;

    for (i = 0, l = keys.length - 1; i < l; i ++) {
        const v = self[keys[i]];

        if (v && typeof v === "object") {
            self = v;
        } else {
            return def;
        }
    }

    return keys[i] in self ? self[keys[i]] : def;
};
