import {
    Context,
    anyGetInContext,
    arrObjClone,
    arrObjFreeze,
    objAssignSingle,
    objCopySingle
} from "../lib";

import {
    IObjInvary,
    TObjInvary,
    TKey
} from "../types";
import {specialize} from "../lib";
import {OBJECT} from "../const";

export const Obj = function<T>(value: any): TObjInvary<T> {
    return new ObjInvary<TObjInvary<T>>(value);
};

let copySet = new Set();

const specialized = specialize(objCopySingle);

export const objSet = specialized.set;
export const objSetPatch = specialized.setPatch;
export const objAll = specialized.all;
export const objAllPatch = specialized.allPatch;

let mutables = new Array(32);
let mutableCurrent = false;
let mutableIndex = 0;

export function ObjInvary<T>(obj?: any) {
    if (obj) {
        <TObjInvary<T>>objCopySingle(obj, this);
    }
}

function ObjInvaryProto() {}

const specializedObjInvary = specialize(function () {
    if (mutableCurrent === true) {
        return mutableCurrent = new ObjInvary(this);
    }

    return mutableCurrent || new ObjInvary(this);
});

ObjInvaryProto.prototype = Object.prototype;

ObjInvary.prototype = objAssignSingle(new ObjInvaryProto(), {
    constructor: Object.prototype.constructor,
    all: function (a?, b?, c?, d?, e?, f?, g?, h?) {
        if (arguments.length < 3) {
            return ObjInvary.prototype.set.call(this, a, b);
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
                    self = root = mutableCurrent = new ObjInvary(this);
                } else {
                    self = root = mutableCurrent || new ObjInvary(this);
                }
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
    },
    get: anyGetInContext,
    set: specializedObjInvary.setInContext,
    //set1: function (key: TKey, val: any) {
    //    if (anyGetInContext.call(this, key) === val) {
    //        return this;
    //    }
    //
    //    let root, self;
    //    let i, l;
    //
    //    if (mutableCurrent === true) {
    //        self = root = mutableCurrent = new ObjInvary(this);
    //    } else {
    //        self = root = mutableCurrent || new ObjInvary(this);
    //    }
    //
    //    for (i = 0, l = Context.getSetKeysCache.length - 1; i < l; i ++) {
    //        const v = self[Context.getSetKeysCache[i]];
    //
    //        self = self[Context.getSetKeysCache[i]] = (v && typeof v === OBJECT) ? arrObjClone(v) : {};
    //    }
    //
    //    self[Context.getSetKeysCache[i]] = val;
    //
    //    Context.getSetKeysCache = null;
    //
    //    return root;
    //},
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
    isObj: (val: any): boolean => val instanceof ObjInvary,
});

export const isObj = ObjInvary.prototype.isObj;
