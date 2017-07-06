import {
    anyGetInContext
} from "./lib";
import {
    Arr,
    arrAll,
    arrAllPatch,
    arrSetInContext,
    arrSetInContextPatch,
    isArr
} from "./compromise/arr";
import {
    Obj,
    objAll,
    objAllPatch,
    objSetInContext,
    objSetInContextPatch,
    isObj
} from "./compromise/obj";

export { Arr, isArr, Obj, isObj };

export const get = function (ctx: any, key: string, def?: any) {
    return anyGetInContext.call(ctx, key, def);
};

export const set = function (ctx: any, key: string, val: any) {
    return ctx instanceof Array ? arrSetInContext.call(ctx, key, val) : objSetInContext.call(ctx, key, val);
};

export const all = function (ctx: any) {
    return ctx instanceof Array ? arrAll.apply(null, arguments) : objAll.apply(null, arguments)
};

export const getPatch = function (ctx: any, key: string, def?: any) {
    return anyGetInContext.call(ctx, key, def);
};

export const setPatch = function (ctx: any, key: string, val: any) {
    return objSetInContextPatch.call(ctx, key, val);
};

export const allPatch = function (ctx: any) {
    return objAllPatch.apply(null, arguments)
};
