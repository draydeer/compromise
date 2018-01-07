import { TObjInvary, TKey } from "../types";
export declare const Obj: <T>(value: any) => TObjInvary<T>;
export declare const objSet: (ctx: any, key: TKey, val: any) => any;
export declare const objSetPatch: (ctx: any, key: TKey, val: any) => any;
export declare const objAll: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const objAllPatch: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare function ObjInvary<T>(obj?: any): void;
export declare const isObj: any;
