import { TKey } from "../lib";
import { TObjInvary } from "./types";
export declare const Obj: <T>(value: any) => TObjInvary<T>;
export declare function objSet(ctx: any, key: TKey, val: any): any;
export declare function objSetPatch(ctx: any, key: TKey, val: any): any;
export declare function objAll(ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function objAllPatch(ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function ObjInvary<T>(obj?: any): void;
export declare const isObj: any;
