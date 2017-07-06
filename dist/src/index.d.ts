import { Arr, isArr } from "./compromise/arr";
import { Obj, isObj } from "./compromise/obj";
export { Arr, isArr, Obj, isObj };
export declare const get: (ctx: any, key: string, def?: any) => any;
export declare const set: (ctx: any, key: string, val: any) => any;
export declare const all: (ctx: any) => any;
export declare const getPatch: (ctx: any, key: string, def?: any) => any;
export declare const setPatch: (ctx: any, key: string, val: any) => any;
export declare const allPatch: (ctx: any) => any;
