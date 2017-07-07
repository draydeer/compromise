export declare const arrAssignArrayLike: (target: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const arrAssignArrayLikeSingle: (target: any, source: any) => any;
export declare const arrMerge: (a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const arrPatchCompare: (target: any, source: any) => any;
export declare const objAssign: (target: any, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const objAssignSingle: (target: any, source: any) => any;
export declare const objMerge: (a?: any, b?: any, c?: any, d?: any, e?: any, f?: any, g?: any, h?: any) => any;
export declare const objPatchCompare: (target: any, source: any) => any;
export declare const arrObjClone: (source: any) => any;
export declare module Context {
    let getSetKeysCache: any[];
}
export declare type TKey = string | (number | string)[];
export declare const anyGetInContext: (key: TKey, def?: any) => any;
