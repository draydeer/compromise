export interface IArr extends Array<any> {
    get(key: string, def?: any): any;
    set(key: string, val: any): this;
    isArr(val: any): boolean;
}
export declare type TArr<T> = IArr & T;
export declare const Arr: <T>(value: any, force?: boolean) => TArr<T>;
export declare const arrSetInContext: (key: string, val: any) => any;
export declare const arrSetInContextPatch: (key: string, val: any) => any;
export declare const arrAll: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const arrAllPatch: (ctx: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const ArrCompromise: <T>(value?: any) => void;
export declare const isArr: any;
