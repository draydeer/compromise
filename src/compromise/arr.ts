import {
    Context,
    TKey,
    anyGetInContext,
    arrAssignArrayLike,
    arrObjClone,
    objAssign
} from "../lib";
import {arrCopySingle} from "../lib";
import {arrAssignArrayLikeSingle} from "../lib";

export interface IArr extends Array<any> {

    get(key: TKey, def?: any): any;

    set(key: TKey, val: any): this;

    isArr(val: any): boolean;

}

export type TArr<T> = IArr & T;

export const Arr = function<T> (value: any, force?: boolean): TArr<T> {
    return value instanceof ArrCompromise && ! force ? value : new ArrCompromise<TArr<T>>(value);
};

let copySet = new Set();

export const arrSetInContext = function (key: TKey, val: any) {
    if (anyGetInContext.call(this, key) === val) {
        return this;
    }

    let root, self = root = new ArrCompromise(this);
    let i, l;

    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
        const v = self[Context.getSetKeysCache[i]];

        self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : {};
    }

    self[Context.getSetKeysCache[i]] = val;

    Context.getSetKeysCache = null;

    return root;
};

export const arrSetInContextPatch = function (key: TKey, val: any) {
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

export const arrAll = function (ctx, a?, b?, c?, d?, e?, f?, g?, h?) {
    if (arguments.length < 4) {
        return ArrCompromise.prototype.set.call(ctx, a, b);
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
            self = root = new ArrCompromise(ctx);
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

export const arrAllPatch = function (ctx, a?, b?, c?, d?, e?, f?, g?, h?) {
    if (arguments.length < 4) {
        return arrSetInContextPatch.call(ctx, a, b);
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
            self = root = {[Context.getSetKeysCache[0]]: ctx[Context.getSetKeysCache[0]]};
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

export const ArrCompromise = function<T> (value?: any) {
    Array.prototype.constructor.call(this);

    value ? (<TArr<T>> arrAssignArrayLike(this, value)) : this.length = 0;
};

const ArrCompromiseProto = function () {};

ArrCompromiseProto.prototype = Array.prototype;

ArrCompromise.prototype = objAssign(new ArrCompromiseProto(), {
    constructor: Array.prototype.constructor,
    all: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        if (arguments.length < 3) {
            return ArrCompromise.prototype.set.call(this, a, b);
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
                self = root = new ArrCompromise(this);
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
    set: arrSetInContext,
    deleteIndex: function (index) {
        if (index !== void 0 && index < this.length) {
            let copy = Arr([]), i, l;

            for (i = 0, l = this.length; i < l; i ++) {
                if (i !== index) {
                    Array.prototype.push.call(copy, this[i]);
                }
            }

            return copy;
        }

        return this;
    },
    insertIndex: function (index, value) {
        if (index !== void 0 && index < this.length) {
            let copy = Arr([]), i, l;

            for (i = 0, l = this.length; i < l; i ++) {
                i === index && Array.prototype.push.call(copy, value);

                Array.prototype.push.call(copy, this[i]);
            }

            return copy;
        }

        return this;
    },
    isArr: (val: any): boolean => val instanceof ArrCompromise,
    pop: function () {
        let copy = Arr(this);

        let result = Array.prototype.pop.apply(copy);

        return [copy, result];
    },
    push: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        let copy = Arr(this);

        let result = Array.prototype.push.apply(copy, arguments);

        return [copy, result];
    },
    slice: function (begin, end) {
        return Arr(this.slice(begin, end));
    },
    shift: function () {
        let copy = Arr(this);

        let result = Array.prototype.shift.apply(copy);

        return [copy, result];
    },
    unshift: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        let copy =  Arr(this);

        let result = Array.prototype.unshift.apply(copy, arguments);

        return [copy, result];
    },
});

export const isArr = ArrCompromise.prototype.isArr;
