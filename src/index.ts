import {
    Context,
    anyGetInContext,
    arrPatchCompare,
    objPatchCompare
} from "./lib";

let ArrImport = Context.isDevMode ? require('./compromise/arr_dev_mode') : require('./compromise/arr');

let ObjImport = Context.isDevMode ? require('./compromise/obj_dev_mode') : require('./compromise/obj');

const Arr = ArrImport.Arr;
const ArrCompromise = ArrImport.ArrCompromise;
const arrAll = ArrImport.arrAll;
const arrAllPatch = ArrImport.arrAllPatch;
const arrSetInContext = ArrImport.arrSetInContext;
const arrSetInContextPatch = ArrImport.arrSetInContextPatch;
const isArr = ArrImport.isArr;

const Obj = ObjImport.Obj;
const ObjCompromise = ObjImport.ObjCompromise;
const objAll = ObjImport.objAll;
const objAllPatch = ObjImport.objAllPatch;
const objSetInContext = ObjImport.objSetInContext;
const objSetInContextPatch = ObjImport.objSetInContextPatch;
const isObj = ObjImport.isObj;

export { Arr, ArrCompromise, isArr, Obj, ObjCompromise, isObj };

export const get = function (target: any, key: string, def?: any) {
    return anyGetInContext.call(target, key, def);
};

export const set = function (target: any, key: string, val: any) {
    return target instanceof Array ? arrSetInContext.call(target, key, val) : objSetInContext.call(target, key, val);
};

export const all = function (target: any, a?, b?, c?, d?, e?, f?, g?, h?) {
    return target instanceof Array ? arrAll.apply(null, arguments) : objAll.apply(null, arguments)
};

export const getPatch = function (target: any, key: string, def?: any) {
    return anyGetInContext.call(target, key, def);
};

export const setPatch = function (target: any, key: string, val: any) {
    return objSetInContextPatch.call(target, key, val);
};

export const allPatch = function (target: any, a?, b?, c?, d?, e?, f?, g?, h?) {
    return objAllPatch.apply(null, arguments)
};

export const allPatchCompare = function (target: any, source: any) {
    return source instanceof Array ? arrPatchCompare(target, source) : objPatchCompare(target, source);
};