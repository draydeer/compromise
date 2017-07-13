import { TKey } from "../lib";
export interface IArr extends Array<any> {
    get(key: TKey, def?: any): any;
    set(key: TKey, val: any): this;
    isArr(val: any): boolean;
}
export declare type TArr<T> = IArr & T;
export declare const Arr: <T>(value: any) => TArr<T>;
export declare function arrSet(ctx: any, key: TKey, val: any): any;
export declare function arrSetPatch(ctx: any, key: TKey, val: any): any;
export declare function arrAll(ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function arrAllPatch(ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function ArrInvary<T>(arr?: any): void;
export declare const isArr: any;
