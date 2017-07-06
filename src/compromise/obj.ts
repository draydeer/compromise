import {
    Context,
    anyGetInContext,
    arrFastCopyArrayLike,
    arrObjClone,
    objFastCopy
} from "../lib";

export interface IObj extends Object {

    get(key: string, def?: any): any;

    set(key: string, val: any): this;

    isObj(val: any): boolean;

}

export type TObj<T> = IObj & T;

export const Obj = function<T> (value: any, force?: boolean): TObj<T> {
    return value instanceof ObjCompromise && ! force ? value : new ObjCompromise<TObj<T>>(value);
};

let copySet = new Set();

export const objSetInContext = function (key: string, val: any) {
    if (anyGetInContext.call(this, key) === val) {
        return this;
    }

    let root, self = root = new ObjCompromise(this);
    let i, l;

    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
        const v = self[Context.getSetKeysCache[i]];

        self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : v;
    }

    self[Context.getSetKeysCache[i]] = val;

    Context.getSetKeysCache = null;

    return root;
};

export const objSetInContextPatch = function (key: string, val: any) {
    if (anyGetInContext.call(this, key) === val) {
        return {};
    }

    let root, self = root = {[Context.getSetKeysCache[0]]: this[Context.getSetKeysCache[0]]};
    let i, l;

    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
        const v = self[Context.getSetKeysCache[i]];

        self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : v;
    }

    self[Context.getSetKeysCache[i]] = val;

    Context.getSetKeysCache = null;

    return root;
};

export const objAll = function (ctx, a?, b?, c?, d?, e?, f?, g?, h?) {
    if (arguments.length < 4) {
        return ObjCompromise.prototype.set.call(ctx, a, b);
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
            self = root = new ObjCompromise({[Context.getSetKeysCache[0]]: ctx[Context.getSetKeysCache[0]]});
        } else {
            self = root;
        }

        for (j = 0, m = Context.getSetKeysCache.length - 1; j < m; j ++) {
            const v = self[Context.getSetKeysCache[j]];

            if (v && typeof v === "object") {
                if (false === copySet.has(v)) {
                    self = self[Context.getSetKeysCache[j]] = arrObjClone(v);

                    copySet.add(self);
                } else {
                    self = self[Context.getSetKeysCache[j]] = v;
                }
            } else {
                self = self[Context.getSetKeysCache[j]] = v;
            }
        }

        self[Context.getSetKeysCache[j]] = arguments[i + 1];
    }

    Context.getSetKeysCache = null;

    return root;
};

export const objAllPatch = function (ctx, a?, b?, c?, d?, e?, f?, g?, h?) {
    if (arguments.length < 4) {
        return objSetInContextPatch.call(ctx, a, b);
    }

    let root = {};
    let self;
    let i, j, l, m;

    copySet.clear();

    for (i = 1, l = arguments.length; i < l; i += 2) {
        if (anyGetInContext.call(ctx, arguments[i]) === arguments[i + 1]) {
            continue;
        }

        if (root === ctx) {
            self = root = {};
        } else {
            self = root;
        }

        for (j = 0, m = Context.getSetKeysCache.length - 1; j < m; j ++) {
            const v = self[Context.getSetKeysCache[j]];

            if (v && typeof v === "object") {
                if (false === copySet.has(v)) {
                    self = self[Context.getSetKeysCache[j]] = arrObjClone(v);

                    copySet.add(self);
                } else {
                    self = self[Context.getSetKeysCache[j]] = v;
                }
            } else {
                self = self[Context.getSetKeysCache[j]] = v;
            }
        }

        self[Context.getSetKeysCache[j]] = arguments[i + 1];
    }

    Context.getSetKeysCache = null;

    return root;
};

const ObjCompromise = function<T> (value?: any) {
    value && (<TObj<T>> objFastCopy(this, value));
};

const ObjCompromiseProto = function () {};

ObjCompromiseProto.prototype = Object.prototype;

ObjCompromise.prototype = objFastCopy(new ObjCompromiseProto(), {
    constructor: Object.prototype.constructor,
    all: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        if (arguments.length < 3) {
            return ObjCompromise.prototype.set.call(this, a, b);
        }

        let root = this;
        let self;
        let i, j, l, m;

        copySet.clear();

        for (i = 0, l = arguments.length; i < l; i += 2) {
            if (anyGetInContext.call(this, arguments[i]) === arguments[i + 1]) {
                continue;
            }

            if (root === this) {
                self = root = new ObjCompromise(this);
            } else {
                self = root;
            }

            for (j = 0, m = Context.getSetKeysCache.length - 1; j < m; j ++) {
                const v = self[Context.getSetKeysCache[j]];

                if (v && typeof v === "object") {
                    if (false === copySet.has(v)) {
                        self = self[Context.getSetKeysCache[j]] = arrObjClone(v);

                        copySet.add(self);
                    } else {
                        self = self[Context.getSetKeysCache[j]] = v;
                    }
                } else {
                    self = self[Context.getSetKeysCache[j]] = v;
                }
            }

            self[Context.getSetKeysCache[j]] = arguments[i + 1];
        }

        Context.getSetKeysCache = null;

        return root;
    },
    get: anyGetInContext,
    set: objSetInContext,
    isObj: (val: any): boolean => val instanceof ObjCompromise,
});

export const isObj = ObjCompromise.prototype.isObj;
