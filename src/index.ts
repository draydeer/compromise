import {
    Context,
    TKey,
    anyGetInContext,
    arrPatchCompare,
    objPatchCompare
} from "./lib";
import {
    IArr
} from "./invary/arr";
import {
    IObj
} from "./invary/obj";

const ArrImport = Context.isDevMode ? require('./invary/arr_dev_mode') : require('./invary/arr');

const Arr = ArrImport.Arr;
const ArrInvary = ArrImport.ArrInvary;
const arrAll = ArrImport.arrAll;
const arrAllPatch = ArrImport.arrAllPatch;
const arrSet = ArrImport.arrSet;
const arrSetPatch = ArrImport.arrSetPatch;
const isArr = ArrImport.isArr;

const ObjImport = Context.isDevMode ? require('./invary/obj_dev_mode') : require('./invary/obj');

const Obj = ObjImport.Obj;
const ObjInvary = ObjImport.ObjInvary;
const objAll = ObjImport.objAll;
const objAllPatch = ObjImport.objAllPatch;
const objSet = ObjImport.objSet;
const objSetPatch = ObjImport.objSetPatch;
const isObj = ObjImport.isObj;

export {
    Arr,
    ArrInvary,
    arrSet,
    arrSetPatch,
    arrAll,
    arrAllPatch,
    isArr,
    Obj,
    ObjInvary,
    objSet,
    objSetPatch,
    objAll,
    objAllPatch,
    isObj
};

export const get = function (target: any, key: TKey, def?: any) {
    return anyGetInContext.call(target, key, def);
};

export const set = function (target: any, key: TKey, val: any) {
    return target instanceof Array ? arrSet(target, key, val) : objSet(target, key, val);
};

export const all = function (target: any, a?, b?, c?, d?, e?, f?, g?, h?) {
    return target instanceof Array ? arrAll.apply(null, arguments) : objAll.apply(null, arguments)
};

export const setPatch = function (target: any, key: TKey, val: any) {
    return objSetPatch(target, key, val);
};

export const allPatch = function (target: any, a?, b?, c?, d?, e?, f?, g?, h?) {
    return objAllPatch.apply(null, arguments)
};

export const allPatchCompare = function (target: any, source: any) {
    return source instanceof Array ? arrPatchCompare(target, source) : objPatchCompare(target, source);
};