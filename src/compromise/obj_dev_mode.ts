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

export const objSetInContext = function (key: TKey, val: any) {
    if (anyGetInContext.call(this, key) === val) {
        return this;
    }

    let root, self = root = objCopySingle(this);
    let i, l;

    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
        const v = self[Context.getSetKeysCache[i]];

        self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : {};
    }

    self[Context.getSetKeysCache[i]] = val;

    Context.getSetKeysCache = null;

    return root;
};

export const objSetInContextPatch = function (key: TKey, val: any) {
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

let mutables = new Array(32);
let mutableCurrent = false;
let mutableDevMode = Context.isDevMode;
let mutableIndex = 0;

export function ObjCompromise<T>(obj?: any, noFreeze?: boolean) {
    if (obj) {
        <TObj<T>> objCopySingle(obj, this);
    }

    if (true !== noFreeze) {
        arrObjFreeze(this);
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
                    self = root = mutableCurrent = new ObjCompromise(this, true);
                } else {
                    self = root = mutableCurrent || new ObjCompromise(this, true);
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
                        self = self[Context.getSetKeysCache[j]] = {};
                    }
                } else {
                    self = self[Context.getSetKeysCache[j]] = v;
                }
            }

            self[Context.getSetKeysCache[j]] = arguments[i + 1];
        }

        if (! mutableCurrent) {
            root.freeze();
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
            self = root = mutableCurrent = new ObjCompromise(this, true);
        } else {
            self = root = mutableCurrent || new ObjCompromise(this, true);
        }

        for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
            const v = self[Context.getSetKeysCache[i]];

            self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : {};
        }

        self[Context.getSetKeysCache[i]] = val;

        if (! mutableCurrent) {
            root.freeze();
        }

        Context.getSetKeysCache = null;

        return root;
    },
    batch: function (callback) {
        mutables[++ mutableIndex] = mutableCurrent;
        mutableCurrent = true;
        mutableDevMode = false;

        let result = callback(this);

        mutableCurrent = mutables[-- mutableIndex];

        if (mutableIndex === 0) {
            mutableDevMode = Context.isDevMode;

            if (result.freeze) {
                result.freeze();
            }
        }

        return result;
    },
    freeze: () => arrObjFreeze(this),
    isObj: (val: any): boolean => val instanceof ObjCompromise,
});

export const isObj = ObjCompromise.prototype.isObj;
