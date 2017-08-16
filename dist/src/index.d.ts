import { TKey, anyGetInContext } from "./lib";
import { IArr, IArrInvary, TArrInvary, IObj, IObjInvary, TObjInvary } from "./invary/types";
import { Arr, ArrInvary, arrAll, arrAllPatch, arrSet, arrSetPatch, isArr } from "./invary/arr";
import { Obj, ObjInvary, objAll, objAllPatch, objSet, objSetPatch, isObj } from "./invary/obj";
export { Arr, ArrInvary, IArr, IArrInvary, TArrInvary, anyGetInContext, arrAll, arrAllPatch, arrSet, arrSetPatch, isArr, Obj, ObjInvary, IObj, IObjInvary, TObjInvary, objAll, objAllPatch, objSet, objSetPatch, isObj };
export declare const get: (target: any, key: TKey, def?: any) => any;
export declare const set: (target: any, key: TKey, val: any) => any;
export declare const all: (target: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const setPatch: (target: any, key: TKey, val: any) => any;
export declare const allPatch: (target: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const allPatchCompare: (target: any, source: any) => any;
export declare const construct: (mixed: any) => IArrInvary | IObjInvary;
export declare const applyIsArrayPatch: () => void;
