import { TDict, TKey } from "../lib";
export interface IArrInvary extends Array<any> {
    get(key: TKey, def?: any): any;
    set(key: TKey, val: any): this;
    all(...args: any[]): this;
    batch(callback: (arr: this) => any): any;
    deleteIndex(ind: number | string): this;
    freeze(): this;
    insertIndex(ind: number | string, val: any): this;
    isArr(val: any): boolean;
    pop(): never;
    pop(): [this, any];
    push(...args: any[]): never;
    push(...args: any[]): [this, number];
    slice(begin: number, end: number): never;
    slice(begin: number, end: number): this;
    shift(): never;
    shift(): [this, any];
    toJSON(): TDict<any>;
    unshift(...args: any[]): never;
    unshift(...args: any[]): [this, number];
}
export declare type TArrInvary<T> = IArrInvary & T;
export declare type IArr<T> = <T>(value: any) => TArrInvary<T>;
export interface IObjInvary extends Object {
    get(key: TKey, def?: any): any;
    set(key: TKey, val: any): this;
    all(...args: any[]): this;
    batch(callback: (arr: this) => any): any;
    freeze(): this;
    isObj(val: any): boolean;
}
export declare type TObjInvary<T> = IObjInvary & T;
export declare type IObj<T> = <T>(value: any) => TObjInvary<T>;
