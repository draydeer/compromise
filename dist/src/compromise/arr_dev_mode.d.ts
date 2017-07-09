import { TKey } from "../lib";
export interface IArr extends Array<any> {
    get(key: TKey, def?: any): any;
    set(key: TKey, val: any): this;
    isArr(val: any): boolean;
}
export declare type TArr<T> = IArr & T;
export declare const Arr: <T>(value: any) => TArr<T>;
export declare const arrSetInContext: (key: TKey, val: any) => any;
export declare const arrSetInContextPatch: (key: TKey, val: any) => any;
export declare const arrAll: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const arrAllPatch: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare function ArrCompromise<T>(arr?: any, noFreeze?: boolean): void;
export declare const isArr: any;
