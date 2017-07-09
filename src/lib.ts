export function arrAssignArrayLike(target, a?, b?, c?, d?, e?, f?, g?, h?): any {
    let i, j, l, m, length;

    for (i = 1, l = arguments.length, length = 0; i < l; i ++) {
        let argv = arguments[i];

        if (argv && argv.length) {
            for (j = 0, m = argv.length; j < m; j ++, length ++) {
                target[length] = argv[j];
            }
        }
    }

    target.length = length;

    return target;
}

export function arrAssignArrayLikeSingle(target, source) {
    let i, l;

    for (i = 0, l = target.length = source.length; i < l; i ++) {
        target[i] = source[i];
    }

    return target;
}

export function arrCopySingle(source, ctx?): any {
    let i, l, target = ctx || new Array(source.length);

    for (i = 0, l = ctx ? ctx.length = source.length : source.length; i < l; i ++) {
        target[i] = source[i];
    }

    return target;
}

export function arrMerge(a?, b?, c?, d?, e?, f?, g?, h?): any {
    let i, j, l, m, target = [];

    for (i = 0, l = arguments.length; i < l; i ++) {
        let argv = arguments[i];

        if (argv && argv.length) {
            for (j = 0, m = argv.length; j < m; j ++) {
                target.push(argv[j]);
            }
        }
    }

    return target;
}

export function arrPatchCompare(target, source): any {
    let i, l, patch = {};

    for (i = 0, l = source.length; i <= l; i ++) {
        if (source[i] !== target[i]) {
            patch[i] = arrObjClone(source[i]);
        }
    }

    return patch;
}

export function objAssign(target, a?, b?, c?, d?, e?, f?, g?, h?): any {
    let i, j, k, l, m;

    for (i = 1, l = arguments.length; i < l; i ++) {
        let argv = arguments[i];

        if (argv) {
            let keys = Object.keys(argv);

            for (j = 1, k = keys[0], m = keys.length; j <= m; k = keys[j ++]) {
                target[k] = argv[k];
            }
        }
    }

    return target;
}

export function objAssignSingle(target, source) {
    let i, l, k, keys = Object.keys(source);

    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i ++]) {
        target[k] = source[k];
    }

    return target;
}

export function objCopySingle(source, ctx?) {
    let i, l, k, keys = Object.keys(source), target = ctx || {};

    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i ++]) {
        target[k] = source[k];
    }

    return target;
}

export function objMerge(a?, b?, c?, d?, e?, f?, g?, h?): any {
    let i, j, l, k, m, target = {};

    for (i = 0, l = arguments.length; i < l; i ++) {
        let argv = arguments[i];

        if (argv) {
            let keys = Object.keys(argv);

            for (j = 1, k = keys[0], m = keys.length; j <= m; k = keys[j ++]) {
                target[k] = argv[k];
            }
        }
    }

    return target;
}

export function objPatchCompare(target, source): any {
    let i, l, k, keys = Object.keys(source), patch = {};

    for (i = 1, k = keys[0], l = keys.length; i <= l; k = keys[i ++]) {
        if (source[k] !== target[k]) {
            patch[k] = arrObjClone(source[k]);
        }
    }

    return patch;
}

export function arrObjClone(source: any): any {
    return source instanceof Array ? arrCopySingle(source) : objCopySingle(source);
}

export function arrObjFreeze(source: any): any {
    if (Array.isArray(source)) {
        let i, l, k, keys = Object.keys(source), v;

        for (i = 0, l = keys.length, k = keys[0]; i < l; i ++, k = keys[i]) {
            v = source[k];

            if (v && typeof v === 'object') {
                source[k] = arrObjFreeze(v);
            }
        }

        Object.freeze(source);
    } else if (source && typeof source === 'object') {
        let i, l, v;

        for (i = 0, l = source.length; i < l; i ++) {
            v = source[i];

            if (v && typeof v === 'object') {
                source[i] = arrObjFreeze(v);
            }
        }

        Object.freeze(source);
    }

    return source;
}

export module Context {
    export let getSetKeysCache = [];
    export let isDevMode = process ? process.env.NODE_ENV === 'dev' : window['COMPROMISE_ENV'] === true;
}

export type TKey = string|(number|string)[];

export function anyGetInContext(key: TKey, def?: any) {
    let self = this;
    let keys = Context.getSetKeysCache = key instanceof Array ? key : (<string> key).split(".");
    let i, l;

    for (i = 0, l = keys.length - 1; i < l; i ++) {
        let v = self[keys[i]];

        if (v && typeof v === "object") {
            self = v;
        } else {
            return def;
        }
    }

    return keys[i] in self ? self[keys[i]] : def;
}
