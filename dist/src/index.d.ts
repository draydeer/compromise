import { Arr, ArrCompromise, isArr } from "./compromise/arr";
import { Obj, ObjCompromise, isObj } from "./compromise/obj";
export { Arr, ArrCompromise, isArr, Obj, ObjCompromise, isObj };
export declare const get: (target: any, key: string, def?: any) => any;
export declare const set: (target: any, key: string, val: any) => any;
export declare const all: (target: any) => any;
export declare const getPatch: (target: any, key: string, def?: any) => any;
export declare const setPatch: (target: any, key: string, val: any) => any;
export declare const allPatch: (target: any) => any;
export declare const allPatchCompare: (target: any, source: any) => any;
