import {
    Context,
    anyGetInContext,
    arrPatchCompare,
    objPatchCompare
} from "./lib";

import {
    IArr,
    IArrInvary,
    //TArrInvary,
    IObj,
    IObjInvary,
    TObjInvary,
    TKey
} from "./types";

import {
    Arr,
    ArrInvary,
    arrAll,
    arrAllPatch,
    arrSet,
    arrSetPatch,
    isArr,
} from "./invary/arr";

import {
    Obj,
    ObjInvary,
    objAll,
    objAllPatch,
    objSet,
    objSetPatch,
    isObj,
} from "./invary/obj";

import {Rec} from "./invary/rec"

import {
    Arr as ArrDev,
    ArrInvary as ArrInvaryDev,
    arrAll as arrAllDev,
    arrAllPatch as arrAllPatchDev,
    arrSet as arrSetDev,
    arrSetPatch as arrSetPatchDev,
    isArr as isArrDev,
} from "./invary/arr_dev_mode";

import {
    Obj as ObjDev,
    ObjInvary as ObjInvaryDev,
    objAll as objAllDev,
    objAllPatch as objAllPatchDev,
    objSet as objSetDev,
    objSetPatch as objSetPatchDev,
    isObj as isObjDev,
} from "./invary/obj_dev_mode";

import {
    Rec as RecDev,
} from "./invary/rec_dev_mode";

export {
    Arr,
    ArrInvary,
    IArr,
    IArrInvary,
    //TArrInvary,
    anyGetInContext,
    arrAll,
    arrAllPatch,
    arrSet,
    arrSetPatch,
    isArr,
    Obj,
    ObjInvary,
    IObj,
    IObjInvary,
    TObjInvary,
    objAll,
    objAllPatch,
    objSet,
    objSetPatch,
    isObj,
    Rec
};

// monkey patch of dev mode
if (Context.isDevMode) {
    exports.Arr = ArrDev;
    exports.ArrInvary = ArrInvaryDev;
    exports.arrAll = arrAllDev;
    exports.arrAllPatch = arrAllPatchDev;
    exports.arrSet = arrSetDev;
    exports.arrSetPatch = arrSetPatchDev;
    exports.isArr = isArrDev;
    exports.Obj = ObjDev;
    exports.ObjInvary = ObjInvaryDev;
    exports.objAll = objAllDev;
    exports.objAllPatch = objAllPatchDev;
    exports.objSet = objSetDev;
    exports.objSetPatch = objSetPatchDev;
    exports.isObj = isObjDev;
    exports.Rec = RecDev;
}

export const get = function (target: any, key: TKey, def?: any) {
    return exports.anyGetInContext.call(target, key, def);
};

export const set = function (target: any, key: TKey, val: any) {
    return target instanceof Array ? exports.arrSet(target, key, val) : exports.objSet(target, key, val);
};

export const all = function (target: any, a?, b?, c?, d?, e?, f?, g?, h?) {
    return target instanceof Array ? exports.arrAll.apply(null, arguments) : exports.objAll.apply(null, arguments)
};

export const setPatch = function (target: any, key: TKey, val: any) {
    return exports.objSetPatch(target, key, val);
};

export const allPatch = function (target: any, a?, b?, c?, d?, e?, f?, g?, h?) {
    return exports.objAllPatch.apply(null, arguments)
};

export const allPatchCompare = function (target: any, source: any) {
    return source instanceof Array ? arrPatchCompare(target, source) : objPatchCompare(target, source);
};

export const construct = function (mixed: any): IArrInvary<any> | IObjInvary {
    return mixed instanceof Array ? exports.Arr(mixed) : exports.Obj(mixed);
};

const isArrayOrigin = Array.isArray.bind(Array);

const isArray = function (arg: any): arg is Array<any> {
    return arg instanceof exports.ArrInvary || isArrayOrigin(arg);
};

export const applyIsArrayPatch = function () {
    if (Array.isArray !== isArray) {
        Array.isArray = isArray;
    }
};

class A<T> extends Array<T> {

}
