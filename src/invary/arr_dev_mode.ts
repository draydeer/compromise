import {
    Context,
    anyGetInContext,
    arrCopySingle,
    arrObjClone,
    arrObjFreeze,
    objAssignSingle
} from "../lib";

import {
    IArrInvary,
    //TArrInvary,
    TKey
} from "../types";
import {specialize} from "../lib";

export const Arr = function<T>(value: any): IArrInvary<T> {
    return new ArrInvary<IArrInvary<T>>(value);
};

const specialized = specialize(arrCopySingle);

export const arrSet = specialized.set;
export const arrSetPatch = specialized.setPatch;
export const arrAll = specialized.all;
export const arrAllPatch = specialized.allPatch;

let mutables = new Array(32);
let mutableCurrent = false;
let mutableDevMode = Context.isDevMode;
let mutableIndex = 0;

export function ArrInvary<T>(arr?: any, noFreeze?: boolean) {
    if (arr) {
        <IArrInvary<T>> arrCopySingle(arr, this);
    }

    if (true !== noFreeze) {
        arrObjFreeze(this);
    }
}

const ArrInvaryProto = function () {};

const specializedArrInvary = specialize(
    function () {
        if (mutableCurrent === true) {
            mutableCurrent = new ArrInvary(this, true);

            return mutableCurrent;
        }

        return mutableCurrent || new ArrInvary(this, true);
    },
    function () {
        if (! mutableCurrent) {
            this.freeze();
        }
    }
);

ArrInvaryProto.prototype = Array.prototype;

ArrInvary.prototype = objAssignSingle(new ArrInvaryProto(), {
    constructor: Array.prototype.constructor,
    all: specializedArrInvary.allInContext,
    get: anyGetInContext,
    set: specializedArrInvary.setInContext,
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
    freeze: function() {
        return arrObjFreeze(this);
    },
    deleteIndex: function (start: number|string, count?: number) {
        if (start !== void 0 && start < this.length && start > - 1) {
            let countToDelete = count || 1;

            if (mutableCurrent) {
                let i, l;

                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this, true);
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

            let copy = new ArrInvary(this, true), i, l;

            for (i = start, l = this.length - countToDelete; i < l; i ++) {
                copy[i] = copy[i + countToDelete];
            }

            for (i = 0; i < countToDelete; i ++) {
                Array.prototype.pop.call(copy);
            }

            copy.freeze();

            return copy;
        }

        return this;
    },
    insertIndex: function (start, a?, b?, c?, d?, e?, f?, g?, h?) {
        if (start !== void 0 && start < this.length && start > - 1) {
            let countToInsert = arguments.length - 1;

            if (mutableCurrent) {
                let i, l;

                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this, true);
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

            let copy = new ArrInvary(this, true), i, l;

            for (i = 0; i < countToInsert; i ++) {
                Array.prototype.push.call(copy, null);
            }

            for (i = this.length - 1, l = start; i >= l; i --) {
                copy[i + countToInsert] = copy[i];
            }

            for (i = 0; i < countToInsert; i ++) {
                copy[start + i] = arguments[i + 1];
            }

            copy.freeze();

            return copy;
        }

        return this;
    },
    isArr: (val: any): boolean => val instanceof ArrInvary,
    pop: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this, true);
            }

            return [mutableCurrent, Array.prototype.pop.apply(mutableCurrent)];
        }

        let copy = new ArrInvary(this, true);
        let result = Array.prototype.pop.apply(copy);

        copy.freeze();

        return [copy, result];
    },
    push: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this, true);
            }

            return [mutableCurrent, Array.prototype.push.apply(mutableCurrent, arguments)];
        }

        let copy = new ArrInvary(this, true);
        let result = Array.prototype.push.apply(copy, arguments);

        copy.freeze();

        return [copy, result];
    },
    slice: function (begin, end) {
        return new ArrInvary(Array.prototype.slice.call(this, begin, end));
    },
    shift: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this, true);
            }

            return [mutableCurrent, Array.prototype.shift.apply(mutableCurrent)];
        }

        let copy = new ArrInvary(this, true);
        let result = Array.prototype.shift.apply(copy);

        if (! mutableCurrent) {
            copy.freeze();
        }

        return [copy, result];
    },
    splice: function (start, deleteCount, a?, b?, c?, d?, e?, f?, g?, h?) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this, true);
            }

            return [mutableCurrent, Array.prototype.splice.apply(mutableCurrent, arguments)];
        }

        let copy = new ArrInvary(this, true);
        let result = Array.prototype.splice.apply(copy, arguments);

        if (! mutableCurrent) {
            copy.freeze();
        }

        return [copy, result];
    },
    toJSON: function () {
        return Array.prototype.constructor.apply(this, this);
    },
    unshift: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this, true);
            }

            return [mutableCurrent, Array.prototype.unshift.apply(mutableCurrent, arguments)];
        }

        let copy = new ArrInvary(this, true);
        let result = Array.prototype.unshift.apply(copy, arguments);

        copy.freeze();

        return [copy, result];
    },
});

export const isArr = ArrInvary.prototype.isArr;
