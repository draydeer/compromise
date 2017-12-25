import {OBJECT} from "./const";
import {TKey} from "./types";

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
        const v = source[i];

        if (v !== target[i]) {
            patch[i] = v && typeof v === OBJECT ? arrObjClone(source[i]) : v;
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
        const v = source[k];

        if (v !== target[k]) {
            patch[k] = v && typeof v === OBJECT ? arrObjClone(source[k]) : v;
        }
    }

    return patch;
}

export function arrObjClone(source: any): any {
    return source instanceof Array ? arrCopySingle(source) : objCopySingle(source);
}

export function arrObjFreeze(source: any): any {
    if (source) {
        if (Array.isArray(source)) {
            let i, l, v;

            for (i = 0, l = source.length; i < l; i ++) {
                v = source[i];

                if (v && typeof v === OBJECT && false === Object.isFrozen(v)) {
                    arrObjFreeze(v);
                }
            }

            if (false === Object.isFrozen(source)) {
                Object.freeze(source);
            }
        } else {
            let i, l, k, keys = Object.keys(source), v;

            for (i = 0, l = keys.length, k = keys[0]; i < l; i ++, k = keys[i]) {
                v = source[k];

                if (v && typeof v === OBJECT && false === Object.isFrozen(v)) {
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

export module Context {
    export let getSetKeysCache = [];
    export let isDevMode = process ? process.env.NODE_ENV === 'dev' : window['INVARY_ENV'] === 'dev';
}

export function anyGetInContext(key: TKey, def?: any) {
    let self = this;
    let keys = Context.getSetKeysCache = key instanceof Array ? key : (<string> key).split(".");
    let i, l;

    for (i = 0, l = keys.length - 1; i < l; i ++) {
        let v = self[keys[i]];

        if (v && typeof v === OBJECT) {
            self = v;
        } else {
            return def;
        }
    }

    return keys[i] in self ? self[keys[i]] : def;
}

export function specialize(copier: (ctx: any) => any) {
    let copySet = new Set();
    
    function set(ctx: any, key: TKey, val: any): any {
        if (anyGetInContext.call(ctx, key) === val) {
            return ctx;
        }

        return setDirect(ctx, key, val);
    }

    function setInContext(key: TKey, val: any): any {
        if (anyGetInContext.call(this, key) === val) {
            return this;
        }

        return setDirect(this, key, val);
    }

    function setDirect(ctx: any, key: TKey, val: any): any {
        let root, self = root = copier(ctx);
        let i, l;

        for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
            const v = self[Context.getSetKeysCache[i]];

            self = self[Context.getSetKeysCache[i]] = (v && typeof v === OBJECT) ? arrObjClone(v) : {};
        }

        self[Context.getSetKeysCache[i]] = val;

        Context.getSetKeysCache = null;

        return root;
    }

    function setDirectMutable(ctx: any, key: TKey, val: any): any {
        let self = ctx;
        let i, l;

        for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
            const v = self[Context.getSetKeysCache[i]];

            self = self[Context.getSetKeysCache[i]] = (v && typeof v === OBJECT) ? v : {};
        }

        self[Context.getSetKeysCache[i]] = val;

        Context.getSetKeysCache = null;

        return ctx;
    }

    function setPatch(ctx: any, key: TKey, val: any): any {
        if (anyGetInContext.call(ctx, key) === val) {
            return {};
        }

        let root, self = root = {[Context.getSetKeysCache[0]]: ctx[Context.getSetKeysCache[0]]};
        let i, l;

        for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
            const v = self[Context.getSetKeysCache[i]];

            self = self[Context.getSetKeysCache[i]] = (v && typeof v === OBJECT) ? arrObjClone(v) : {};
        }

        self[Context.getSetKeysCache[i]] = val;

        Context.getSetKeysCache = null;

        return root;
    }

    function all(ctx, a?, b?, c?, d?, e?, f?, g?, h?): any {
        if (arguments.length < 4) {
            return set(ctx, a, b);
        }

        let root = ctx;
        let self;
        let i, j, l, m;

        copySet.clear();

        for (i = 1, l = arguments.length; i < l; i += 2) {
            if (anyGetInContext.call(ctx, arguments[i]) === arguments[i + 1]) {
                continue;
            }

            if (root === ctx) {
                self = root = copier(ctx);
            } else {
                self = root;
            }

            for (j = 0, m = Context.getSetKeysCache.length - 1; j < m; j ++) {
                const v = self[Context.getSetKeysCache[j]];

                if (v && typeof v === OBJECT) {
                    if (false === copySet.has(v)) {
                        self = self[Context.getSetKeysCache[j]] = arrObjClone(v);

                        copySet.add(self);
                    } else {
                        self = v;
                    }
                } else {
                    self = self[Context.getSetKeysCache[j]] = {};
                }
            }

            self[Context.getSetKeysCache[j]] = arguments[i + 1];
        }

        Context.getSetKeysCache = null;

        return root;
    }

    function allPatch(ctx, a?, b?, c?, d?, e?, f?, g?, h?): any {
        if (arguments.length < 4) {
            return setPatch(ctx, a, b);
        }

        let root = {};
        let self;
        let i, j, l, m;

        copySet.clear();

        for (i = 1, l = arguments.length; i < l; i += 2) {
            if (anyGetInContext.call(ctx, arguments[i]) === arguments[i + 1]) {
                continue;
            }

            self = root;

            if (false === Context.getSetKeysCache[0] in self) {
                self[Context.getSetKeysCache[0]] = ctx[Context.getSetKeysCache[0]];
            }

            for (j = 0, m = Context.getSetKeysCache.length - 1; j < m; j ++) {
                const v = self[Context.getSetKeysCache[j]];

                if (v && typeof v === OBJECT) {
                    if (false === copySet.has(v)) {
                        self = self[Context.getSetKeysCache[j]] = arrObjClone(v);

                        copySet.add(self);
                    } else {
                        self = v;
                    }
                } else {
                    self = self[Context.getSetKeysCache[j]] = {};
                }
            }

            self[Context.getSetKeysCache[j]] = arguments[i + 1];
        }

        Context.getSetKeysCache = null;

        return root;
    }

    return {
        set,
        setInContext,
        setDirect,
        setDirectMutable,
        setPatch,
        all,
        allPatch,
    };
}