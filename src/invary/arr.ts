import {
    Context,
    anyGetInContext,
    arrCopySingle,
    arrObjClone,
    arrObjFreeze,
    objAssignSingle, es5Class, arrAssignArrayLikeSingle
} from "../lib";

import {
    IArrInvary,
    //TArrInvary,
    TDict,
    TKey
} from "../types";
import {OBJECT} from "../const";
import {specialize, specializeArr} from "../lib";

export const Arr = function<T>(value: any): IArrInvary<T> {
    return new ArrInvary<T>(value);
};

const specialized = specialize(arrCopySingle);

export const arrSet = specialized.set;
export const arrSetPatch = specialized.setPatch;
export const arrAll = specialized.all;
export const arrAllPatch = specialized.allPatch;

let mutables = new Array(32);
let mutableCurrent: any = false;
let mutableIndex = 0;

// const ArrInvaryProto = function () {};
//
// ArrInvaryProto.prototype = Array.prototype;

const specializedArrInvary = specializeArr(function () {
    if (mutableCurrent === true) {
        mutableCurrent = new ArrInvary(this);

        return mutableCurrent;
    }

    return mutableCurrent || new ArrInvary(this);
});
const specializedArrInvaryCommon = specialize(function () {
    if (mutableCurrent === true) {
        mutableCurrent = new ArrInvary(this);

        return mutableCurrent;
    }

    return mutableCurrent || new ArrInvary(this);
});

let superCall = false;

export class ArrInvary<T> extends Array<T> implements IArrInvary<T> {

    public constructor(arr?: any) {

        // skip calling of superclass to bypass assigning of Array.constructor return value having Array type to "this":
        // _this = _super.call(this) <-- Array instance will be returned
        // see js version for more details
        if (superCall) {
            super();
        }

        if (arr) {
            <IArrInvary<T>> arrAssignArrayLikeSingle(this, arr);
        }
    }

    public all(a?, b?, c?, d?, e?, f?, g?, h?): ArrInvary<T> { return this; };

    public get(key: TKey, defaultValue?: any): any { return null; };

    public set(key: TKey, val: T): ArrInvary<T> { return this; };

    public batch(callback): ArrInvary<T> {
        mutables[++ mutableIndex] = mutableCurrent;

        mutableCurrent = true;

        let result = callback(this);

        mutableCurrent = mutables[-- mutableIndex];

        return result;
    };

    //public concat(...items: ReadonlyArray<T>[]): this { return this; };
    public deleteIndex(start: number|string, count?: number): ArrInvary<T> {
        if (start !== void 0 && start < this.length && start > - 1) {
            let countToDelete = count || 1;

            if (mutableCurrent) {
                let i, l;

                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary<T>(this);
                }

                mutableCurrent[start] = null;

                for (i = start, l = this.length - countToDelete; i < l; i ++) {
                    mutableCurrent[i] = mutableCurrent[i + countToDelete];
                }

                for (i = 0; i < countToDelete; i ++) {
                    Array.prototype.pop.call(mutableCurrent);
                }

                return mutableCurrent;
            }

            let copy = new ArrInvary<T>(this), i, l;

            for (i = start, l = this.length - countToDelete; i < l; i ++) {
                copy[i] = copy[i + countToDelete];
            }

            for (i = 0; i < countToDelete; i ++) {
                Array.prototype.pop.call(copy);
            }

            return copy;
        }

        return this;
    };

    //public fill(value: number, start?: number, end?: number): this { return this; };
    //public filter<S extends T>(fn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[] { return []; };
    public freeze(): this {
        return arrObjFreeze(this);
    };

    public insertIndex(start: number|string, a?, b?, c?, d?, e?, f?, g?, h?): ArrInvary<T> {
        if (start !== void 0 && start < this.length && start > - 1) {
            let countToInsert = arguments.length - 1;

            if (mutableCurrent) {
                let i, l;

                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary<T>(this);
                }

                for (i = 0; i < countToInsert; i ++) {
                    Array.prototype.push.call(mutableCurrent, null);
                }

                for (i = this.length - 1, l = start; i >= l; i --) {
                    mutableCurrent[i + countToInsert] = mutableCurrent[i];
                }

                for (i = 0; i < countToInsert; i ++) {
                    mutableCurrent[start + i] = arguments[i + 1];
                }

                return mutableCurrent;
            }

            let copy = new ArrInvary<T>(this), i, l;

            for (i = 0; i < countToInsert; i ++) {
                Array.prototype.push.call(copy, null);
            }

            for (i = this.length - 1, l = start; i >= l; i --) {
                copy[i + countToInsert] = copy[i];
            }

            for (i = 0; i < countToInsert; i ++) {
                copy[start + i] = arguments[i + 1];
            }

            return copy;
        }

        return this;
    };

    public isArr(val: T): boolean {
        return val instanceof ArrInvary;
    };

    //public map<U>(fn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] { return []; };
    public pop(): never;
    public pop(): [ArrInvary<T>, T] {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }

            return [mutableCurrent, Array.prototype.pop.apply(mutableCurrent)];
        }

        let copy = new ArrInvary<T>(this);
        let result = Array.prototype.pop.apply(copy);

        return [copy, result];
    };

    public push(...args: T[]): never;
    public push(...args: T[]): [ArrInvary<T>, number] {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary<T>(this);
            }

            return [mutableCurrent, Array.prototype.push.apply(mutableCurrent, arguments)];
        }

        let copy = new ArrInvary<T>(this);
        let result = Array.prototype.push.apply(copy, arguments);

        return [copy, result];
    };

    //public reverse(): T[] { return []; };
    public slice(begin: number, end: number): never;
    public slice(begin: number, end: number): ArrInvary<T> { return this; };
    public shift(): never;
    public shift(): [ArrInvary<T>, T] { return [this, void 0]; };
    public sort(fn?: (a: T, b: T) => number): ArrInvary<T> { return this; };
    public splice(start: number, deleteCount: number, ...elements: T[]): never;
    public splice(start: number, deleteCount: number, ...elements: T[]): [ArrInvary<T>, any[]] { return [this, []] };
    public toJSON(): TDict<T> { return {}; };
    public unshift(...args: T[]): never;
    public unshift(...args: T[]): [ArrInvary<T>, number] { return [this, 0]; };

}

objAssignSingle(ArrInvary.prototype, {
    get: anyGetInContext,
    set: specializedArrInvaryCommon.setInContext,
    all: specializedArrInvaryCommon.allInContext,
    batch: function (callback) {
        mutables[++ mutableIndex] = mutableCurrent;

        mutableCurrent = true;

        let result = callback(this);

        mutableCurrent = mutables[-- mutableIndex];

        return result;
    },
    deleteIndex2: specializedArrInvary.deleteIndexInContext,
    deleteIndex1: function (start: number|string, count?: number) {
        if (start !== void 0 && start < this.length && start > - 1) {
            let countToDelete = count || 1;

            if (mutableCurrent) {
                let i, l;

                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this);
                }

                mutableCurrent[start] = null;

                for (i = start, l = this.length - countToDelete; i < l; i ++) {
                    mutableCurrent[i] = mutableCurrent[i + countToDelete];
                }

                for (i = 0; i < countToDelete; i ++) {
                    Array.prototype.pop.call(mutableCurrent);
                }

                return mutableCurrent;
            }

            let copy = new ArrInvary(this), i, l;

            for (i = start, l = this.length - countToDelete; i < l; i ++) {
                copy[i] = copy[i + countToDelete];
            }

            for (i = 0; i < countToDelete; i ++) {
                Array.prototype.pop.call(copy);
            }

            return copy;
        }

        return this;
    },
    // freeze: function() {
    //     return arrObjFreeze(this);
    // },
    insertIndex2: specializedArrInvary.insertIndexInContext,
    insertIndex1: function (start, a?, b?, c?, d?, e?, f?, g?, h?) {
        if (start !== void 0 && start < this.length && start > - 1) {
            let countToInsert = arguments.length - 1;

            if (mutableCurrent) {
                let i, l;

                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this);
                }

                for (i = 0; i < countToInsert; i ++) {
                    Array.prototype.push.call(mutableCurrent, null);
                }

                for (i = this.length - 1, l = start; i >= l; i --) {
                    mutableCurrent[i + countToInsert] = mutableCurrent[i];
                }

                for (i = 0; i < countToInsert; i ++) {
                    mutableCurrent[start + i] = arguments[i + 1];
                }

                return mutableCurrent;
            }

            let copy = new ArrInvary(this), i, l;

            for (i = 0; i < countToInsert; i ++) {
                Array.prototype.push.call(copy, null);
            }

            for (i = this.length - 1, l = start; i >= l; i --) {
                copy[i + countToInsert] = copy[i];
            }

            for (i = 0; i < countToInsert; i ++) {
                copy[start + i] = arguments[i + 1];
            }

            return copy;
        }

        return this;
    },
    isArr: (val: any): boolean => val instanceof ArrInvary,
    pop2: specializedArrInvary.popInContext,
    pop1: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }

            return [mutableCurrent, Array.prototype.pop.apply(mutableCurrent)];
        }

        let copy = new ArrInvary(this);
        let result = Array.prototype.pop.apply(copy);

        return [copy, result];
    },
    push2: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }

            return [mutableCurrent, Array.prototype.push.apply(mutableCurrent, arguments)];
        }

        let copy = new ArrInvary(this);
        let result = Array.prototype.push.apply(copy, arguments);

        return [copy, result];
    },
    slice: function (begin, end) {
        return new ArrInvary(Array.prototype.slice.call(this, begin, end));
    },
    shift: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }

            return [mutableCurrent, Array.prototype.shift.apply(mutableCurrent)];
        }

        let copy = new ArrInvary(this);
        let result = Array.prototype.shift.apply(copy);

        return [copy, result];
    },
    splice: function (start, deleteCount, a?, b?, c?, d?, e?, f?, g?, h?) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }

            return [mutableCurrent, Array.prototype.splice.apply(mutableCurrent, arguments)];
        }

        let copy = new ArrInvary(this);
        let result = Array.prototype.splice.apply(copy, arguments);

        return [copy, result];
    },
    toJSON: function () {
        return Array.prototype.constructor.apply(this, this);
    },
    unshift: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }

            return [mutableCurrent, Array.prototype.unshift.apply(mutableCurrent, arguments)];
        }

        let copy = new ArrInvary(this);
        let result = Array.prototype.unshift.apply(copy, arguments);

        return [copy, result];
    },
});

export const isArr = ArrInvary.prototype.isArr;
