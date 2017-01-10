
import {arrFastCopyArrayLike, arrObjClone, objFastCopy} from "../lib";

export interface IArr extends Array<any> {

    get(key: string, def?: any): any;

    set(key: string, val: any): this;

    isArr(val: any): boolean;

}

export type TArr<T> = IArr & T;

export const Arr = function<T> (value: any, force?: boolean): TArr<T> {
    return value instanceof ArrCompromise && ! force ? value : new ArrCompromise<TArr<T>>(value);
};

let getSetKeysCache;

const get = function (key: string, def?: any) {
    let self = this;
    let keys = getSetKeysCache = key.split(".");

    for (let i = 0, l = keys.length; i < l; i ++) {
        const k = keys[i];

        if (k in self) {
            const v = self[k];

            if (v instanceof Object) {
                self = v;
            } else {
                return i === l - 1 ? v : def;
            }
        } else {
            return def;
        }
    }

    return self;
};

const ArrCompromise = function<T> (value?: any) {
    value ? (<TArr<T>> arrFastCopyArrayLike(this, value)) : this.length = 0;
};

const ArrCompromiseProto = function () {};

ArrCompromiseProto.prototype = Array.prototype;

ArrCompromise.prototype = objFastCopy(new ArrCompromiseProto(), {
    constructor: Array.prototype.constructor,
    get,
    set: function (key: string, val: any) {
        if (get.call(this, key) === val) {
            return this;
        }

        let root, self = root = new ArrCompromise(this);
        let keys = getSetKeysCache;

        for (let i = 0, l = keys.length; i < l; i ++) {
            const v = self[keys[i]];

            self = self[keys[i]] = i === l - 1 ? val : ((typeof v === "object" && v !== null) ? arrObjClone(v) : v);
        }

        return root;
    },
    isArr: (val: any): boolean => val instanceof ArrCompromise,
});

export const isArr = ArrCompromise.prototype.isArr;
