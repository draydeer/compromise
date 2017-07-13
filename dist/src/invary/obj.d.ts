import { TKey } from "../lib";
export interface IObj extends Object {
    get(key: TKey, def?: any): any;
    set(key: TKey, val: any): this;
    isObj(val: any): boolean;
}
export declare type TObj<T> = IObj & T;
export declare const Obj: <T>(value: any) => TObj<T>;
export declare function objSet(ctx: any, key: TKey, val: any): any;
export declare function objSetPatch(ctx: any, key: TKey, val: any): any;
export declare function objAll(ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function objAllPatch(ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function ObjInvary<T>(obj?: any): void;
export declare const isObj: any;
