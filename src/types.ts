export type TDict<T> = { [key: string]: T };

export type TKey = string|(number|string)[];

export interface IArrInvary<T> extends Array<T> {
    get(key: TKey, def?: any): any;
    set(key: TKey, val: any): IArrInvary<T>;
    all(...args: any[]): IArrInvary<T>;
    batch(callback: (arr: this) => any): any;
    deleteIndex(start: number|string, count?: number): IArrInvary<T>;
    freeze(): this;
    insertIndex(start: number|string, a?, b?, c?, d?, e?, f?, g?, h?): IArrInvary<T>;
    isArr(val: any): boolean;
    pop(): never;
    pop(): [IArrInvary<T>, any];
    push(...args: any[]): never;
    push(...args: any[]): [IArrInvary<T>, number];
    slice(begin: number, end: number): never;
    slice(begin: number, end: number): IArrInvary<T>;
    shift(): never;
    shift(): [IArrInvary<T>, any];
    splice(start: number, deleteCount: number, ...elements: any[]): never;
    splice(start: number, deleteCount: number, ...elements: any[]): [IArrInvary<T>, any[]];
    toJSON(): TDict<any>;
    unshift(...args: any[]): never;
    unshift(...args: any[]): [IArrInvary<T>, number];
}

// export type TArrInvary<T> = IArrInvary<any> & T;

export type IArr<T> = <T>(value: any) => IArrInvary<T>;

export interface IObjInvary extends Object {
    get(key: TKey, def?: any): any;
    set(key: TKey, val: any): this;
    all(...args: any[]): this;
    batch(callback: (arr: this) => any): any;
    freeze(): this;
    isObj(val: any): boolean;
}

export type TObjInvary<T> = IObjInvary & T;

export type IObj<T> = <T>(value: any) => TObjInvary<T>;

export interface IRecInvary<T> extends Function {
    new (props?: Partial<T>): this;
    get(key: TKey, def?: any): any;
    set(key: TKey, val: any): this;
    freeze(): this;
}

export type TRecInvary<T> = IRecInvary<T> & T;
