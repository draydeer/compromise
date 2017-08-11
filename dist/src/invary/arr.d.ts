import { TKey } from "../lib";
import { TArrInvary } from "./types";
export declare const Arr: <T>(value: any) => TArrInvary<T>;
export declare function arrSet(ctx: any, key: TKey, val: any): any;
export declare function arrSetPatch(ctx: any, key: TKey, val: any): any;
export declare function arrAll(ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function arrAllPatch(ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function ArrInvary<T>(arr?: any): void;
export declare const isArr: any;
