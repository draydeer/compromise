import { IArrInvary, TKey } from "../types";
export declare const Arr: <T>(value: any) => IArrInvary<T>;
export declare const arrSet: (ctx: any, key: TKey, val: any) => any;
export declare const arrSetPatch: (ctx: any, key: TKey, val: any) => any;
export declare const arrAll: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const arrAllPatch: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare function ArrInvary<T>(arr?: any, noFreeze?: boolean): void;
export declare const isArr: any;
