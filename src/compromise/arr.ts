import {
    Context,
    TKey,
    anyGetInContext,
    arrCopySingle,
    arrObjClone,
    arrObjFreeze,
    objAssignSingle
} from "../lib";

export interface IArr extends Array<any> {

    get(key: TKey, def?: any): any;

    set(key: TKey, val: any): this;

    isArr(val: any): boolean;

}

export type TArr<T> = IArr & T;

export const Arr = function<T> (value: any): TArr<T> {
    return new ArrCompromise<TArr<T>>(value);
};

let copySet = new Set();

export const arrSetInContext = function (key: TKey, val: any) {
    if (anyGetInContext.call(this, key) === val) {
        return this;
    }

    let root, self = root = arrCopySingle(this);
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

        self = self[Context.getSetKeysCache[i]] = (v && typeof v === "object") ? arrObjClone(v) : {};
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
                self = self[Context.getSetKeysCache[j]] = {};
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
                self = self[Context.getSetKeysCache[j]] = {};
            }
        }

        self[Context.getSetKeysCache[j]] = arguments[i + 1];
    }

    Context.getSetKeysCache = null;

    return root;
};

let mutables = new Array(32);
let mutableCurrent = false;
let mutableIndex = 0;

export function ArrCompromise<T>(arr?: any) {
    if (arr) {
        <TArr<T>> arrCopySingle(arr, this);
    }
}

const ArrCompromiseProto = function () {};

ArrCompromiseProto.prototype = Array.prototype;

ArrCompromise.prototype = objAssignSingle(new ArrCompromiseProto(), {
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
                if (mutableCurrent === true) {
                    self = root = mutableCurrent = new ArrCompromise(this);
                } else {
                    self = root = mutableCurrent || new ArrCompromise(this);
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
                        self = self[Context.getSetKeysCache[j]] = v;
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
            self = root = mutableCurrent = new ArrCompromise(this);
        } else {
            self = root = mutableCurrent || new ArrCompromise(this);
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
    freeze: () => arrObjFreeze(this),
    deleteIndex: function (index) {
        if (index !== void 0 && index < this.length && index > - 1) {
            if (mutableCurrent) {
                let i, l;

                if (mutableCurrent === true) {
                    mutableCurrent = new ArrCompromise(this);
                }

                mutableCurrent[index] = null;

                for (i = index, l = this.length - 1; i < l; i ++) {
                    mutableCurrent[i] = mutableCurrent[i + 1];
                }

                Array.prototype.pop.call(mutableCurrent);

                return mutableCurrent;
            }

            let copy = new ArrCompromise(this), i, l;

            copy[index] = null;

            for (i = index, l = this.length - 1; i < l; i ++) {
                copy[i] = copy[i + 1];
            }

            Array.prototype.pop.call(copy);

            return copy;
        }

        return this;
    },
    insertIndex: function (index, value) {
        if (index !== void 0 && index < this.length && index > - 1) {
            if (mutableCurrent) {
                let i, l;

                if (mutableCurrent === true) {
                    mutableCurrent = new ArrCompromise(this);
                }

                Array.prototype.push.call(mutableCurrent, null);

                for (i = this.length - 1, l = index; i >= l; i --) {
                    mutableCurrent[i + 1] = mutableCurrent[i];
                }

                mutableCurrent[index] = value;

                return mutableCurrent;
            }

            let copy = new ArrCompromise(this), i, l;

            Array.prototype.push.call(copy, null);

            for (i = this.length - 1, l = index; i >= l; i --) {
                copy[i + 1] = copy[i];
            }

            copy[index] = value;

            return copy;
        }

        return this;
    },
    isArr: (val: any): boolean => val instanceof ArrCompromise,
    pop: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrCompromise(this);
            }

            return [mutableCurrent, Array.prototype.pop.apply(mutableCurrent)];
        }

        let copy = new ArrCompromise(this);

        let result = Array.prototype.pop.apply(copy);

        return [copy, result];
    },
    push: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrCompromise(this);
            }

            return [mutableCurrent, Array.prototype.push.apply(mutableCurrent, arguments)];
        }

        let copy = new ArrCompromise(this);

        let result = Array.prototype.push.apply(copy, arguments);

        return [copy, result];
    },
    slice: function (begin, end) {
        return new ArrCompromise(this.slice(begin, end));
    },
    shift: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrCompromise(this);
            }

            return [mutableCurrent, Array.prototype.shift.apply(mutableCurrent)];
        }

        let copy = new ArrCompromise(this);

        let result = Array.prototype.shift.apply(copy);

        return [copy, result];
    },
    toJSON: function () {
        let i, l, json = '[';

        for (i = 0, l = this.length; i < l; i ++) {
            json += JSON.stringify(this[i]);

            if (i < l - 1) {
                json += ',';
            }
        }

        return json + ']';
    },
    unshift: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrCompromise(this);
            }

            return [mutableCurrent, Array.prototype.unshift.apply(mutableCurrent, arguments)];
        }

        let copy = new ArrCompromise(this);

        let result = Array.prototype.unshift.apply(copy, arguments);

        return [copy, result];
    },
});

export const isArr = ArrCompromise.prototype.isArr;
