import { TKey } from "./types";
export declare function arrAssignArrayLike(target: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function arrAssignArrayLikeSingle(target: any, source: any): any;
export declare function arrCopySingle(source: any, ctx?: any): any;
export declare function arrMerge(a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function arrPatchCompare(target: any, source: any): any;
export declare function objAssign(target: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function objAssignSingle(target: any, source: any): any;
export declare function objCopySingle(source: any, ctx?: any): any;
export declare function objMerge(a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any): any;
export declare function objPatchCompare(target: any, source: any): any;
export declare function arrObjClone(source: any): any;
export declare function arrObjFreeze(source: any): any;
export declare module Context {
    let getSetKeysCache: any[];
    let isDevMode: boolean;
}
export declare function anyGetInContext(key: TKey, def?: any): any;
