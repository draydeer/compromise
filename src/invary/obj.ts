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
        mutableCurrent = new ObjInvary(this);

        return mutableCurrent;
    }

    return mutableCurrent || new ObjInvary(this);
});

ObjInvaryProto.prototype = Object.prototype;

ObjInvary.prototype = objAssignSingle(new ObjInvaryProto(), {
    constructor: Object.prototype.constructor,
    all: specializedObjInvary.allInContext,
    get: anyGetInContext,
    set: specializedObjInvary.setInContext,
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
