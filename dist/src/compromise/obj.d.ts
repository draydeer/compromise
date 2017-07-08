import { TKey } from "../lib";
export interface IObj extends Object {
    get(key: TKey, def?: any): any;
    set(key: TKey, val: any): this;
    isObj(val: any): boolean;
}
export declare type TObj<T> = IObj & T;
export declare const Obj: <T>(value: any, force?: boolean) => TObj<T>;
export declare const objSetInContext: (key: TKey, val: any) => any;
export declare const objSetInContextPatch: (key: TKey, val: any) => any;
export declare const objAll: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const objAllPatch: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const ObjCompromise: <T>(value?: any) => void;
export declare const isObj: any;
