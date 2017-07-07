import {
    anyGetInContext,
    arrPatchCompare,
    objPatchCompare
} from "./lib";
import {
    Arr,
    ArrCompromise,
    arrAll,
    arrAllPatch,
    arrSetInContext,
    arrSetInContextPatch,
    isArr
} from "./compromise/arr";
import {
    Obj,
    ObjCompromise,
    objAll,
    objAllPatch,
    objSetInContext,
    objSetInContextPatch,
    isObj
} from "./compromise/obj";

export { Arr, ArrCompromise, isArr, Obj, ObjCompromise, isObj };

export const get = function (target: any, key: string, def?: any) {
    return anyGetInContext.call(target, key, def);
};

export const set = function (target: any, key: string, val: any) {
    return target instanceof Array ? arrSetInContext.call(target, key, val) : objSetInContext.call(target, key, val);
};

export const all = function (target: any) {
    return target instanceof Array ? arrAll.apply(null, arguments) : objAll.apply(null, arguments)
};

export const getPatch = function (target: any, key: string, def?: any) {
    return anyGetInContext.call(target, key, def);
};

export const setPatch = function (target: any, key: string, val: any) {
    return objSetInContextPatch.call(target, key, val);
};

export const allPatch = function (target: any) {
    return objAllPatch.apply(null, arguments)
};

export const allPatchCompare = function (target: any, source: any) {
    return source instanceof Array ? arrPatchCompare(target, source) : objPatchCompare(target, source);
};