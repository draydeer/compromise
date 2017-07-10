import {
    Context,
    TKey,
    anyGetInContext,
    arrObjClone,
    arrObjFreeze,
    objAssignSingle,
    objCopySingle
} from "../lib";

export interface IObj extends Object {

    get(key: TKey, def?: any): any;

    set(key: TKey, val: any): this;

    isObj(val: any): boolean;

}

export type TObj<T> = IObj & T;

export const Obj = function<T> (value: any): TObj<T> {
    return new ObjCompromise<TObj<T>>(value);
};

let copySet = new Set();

export function objSet(ctx: any, key: TKey, val: any) {
    if (anyGetInContext.call(ctx, key) === val) {
        return ctx;
    }

    let root, self = root = objCopySingle(ctx);
    let i, l;

    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
        const v = self[Context.getSetKeysCache[i]];

        self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : {};
    }

    self[Context.getSetKeysCache[i]] = val;

    Context.getSetKeysCache = null;

    return root;
}

export function objSetPatch(ctx: any, key: TKey, val: any) {
    if (anyGetInContext.call(this, key) === val) {
        return {};
    }

    let root, self = root = {[Context.getSetKeysCache[0]]: ctx[Context.getSetKeysCache[0]]};
    let i, l;

    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
        const v = self[Context.getSetKeysCache[i]];

        self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : {};
    }

    self[Context.getSetKeysCache[i]] = val;

    Context.getSetKeysCache = null;

    return root;
}

export function objAll(ctx, a?, b?, c?, d?, e?, f?, g?, h?) {
    if (arguments.length < 4) {
        return objSet(ctx, a, b);
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
            self = root = objCopySingle(ctx);
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

export function objAllPatch(ctx, a?, b?, c?, d?, e?, f?, g?, h?) {
    if (arguments.length < 4) {
        return objSetPatch(ctx, a, b);
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

            if (v && typeof v === "object") {
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

let mutables = new Array(32);
let mutableCurrent = false;
let mutableIndex = 0;

export function ObjCompromise<T>(obj?: any) {
    if (obj) {
        <TObj<T>> objCopySingle(obj, this);
    }
}

const ObjCompromiseProto = function () {};

ObjCompromiseProto.prototype = Object.prototype;

ObjCompromise.prototype = objAssignSingle(new ObjCompromiseProto(), {
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
                if (mutableCurrent === true) {
                    self = root = mutableCurrent = new ObjCompromise(this);
                } else {
                    self = root = mutableCurrent || new ObjCompromise(this);
                }
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
    },
    get: anyGetInContext,
    set: function (key: TKey, val: any) {
        if (anyGetInContext.call(this, key) === val) {
            return this;
        }

        let root, self;
        let i, l;

        if (mutableCurrent === true) {
            self = root = mutableCurrent = new ObjCompromise(this);
        } else {
            self = root = mutableCurrent || new ObjCompromise(this);
        }

        for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
            const v = self[Context.getSetKeysCache[i]];

            self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : {};
        }

        self[Context.getSetKeysCache[i]] = val;

        Context.getSetKeysCache = null;

        return root;
    },
    batch: function (callback) {
        mutables[++ mutableIndex] = mutableCurrent;

        mutableCurrent = true;

        let result = callback(this);

        mutableCurrent = mutables[-- mutableIndex];

        return result;
    },
    freeze: function() {
        return arrObjFreeze(this);
    },
    isObj: (val: any): boolean => val instanceof ObjCompromise,
});

export const isObj = ObjCompromise.prototype.isObj;
