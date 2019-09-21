import { IArrInvary, TDict, TKey } from "../types";
export declare const Arr: <T>(value: any) => IArrInvary<T>;
export declare const arrSet: (ctx: any, key: TKey, val: any) => any;
export declare const arrSetPatch: (ctx: any, key: TKey, val: any) => any;
export declare const arrAll: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const arrAllPatch: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare class ArrInvary<T> extends Array<T> implements IArrInvary<T> {
    constructor(arr?: any);
    all(a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): this;
    get(key: TKey, defaultValue?: any): any;
    set(key: TKey, val: T): this;
    batch(callback: any): this;
    deleteIndex(start: number | string, count?: number): this;
    freeze(): this;
    insertIndex(start: number | string, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): this;
    isArr(val: T): boolean;
    pop(): never;
    push(...args: T[]): never;
    slice(begin: number, end: number): never;
    shift(): never;
    sort(fn?: (a: T, b: T) => number): this;
    splice(start: number, deleteCount: number, ...elements: T[]): never;
    toJSON(): TDict<T>;
    unshift(...args: T[]): never;
}
export declare const isArr: (val: any) => boolean;
