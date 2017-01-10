
import {arrFastCopyArrayLike, arrObjClone, objFastCopy} from "../lib";

export interface IObj extends Object {

    get(key: string, def?: any): any;

    set(key: string, val: any): this;

    isObj(val: any): boolean;

}

export type TObj<T> = IObj & T;

export const Obj = function<T> (value: any, force?: boolean): TObj<T> {
    return value instanceof ObjCompromise && ! force ? value : new ObjCompromise<TObj<T>>(value);
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

const ObjCompromise = function<T> (value?: any) {
    value && (<TObj<T>> objFastCopy(this, value));
};

const ObjCompromiseProto = function () {};

ObjCompromiseProto.prototype = Object.prototype;

ObjCompromise.prototype = objFastCopy(new ObjCompromiseProto(), {
    constructor: Object.prototype.constructor,
    get,
    set: function (key: string, val: any) {
        if (get.call(this, key) === val) {
            return this;
        }

        let root, self = root = new ObjCompromise(this);
        let keys = getSetKeysCache;

        for (let i = 0, l = keys.length; i < l; i ++) {
            const v = self[keys[i]];

            self = self[keys[i]] = i === l - 1 ? val : ((typeof v === "object" && v !== null) ? arrObjClone(v) : v);
        }

        return root;
    },
    isObj: (val: any): boolean => val instanceof ObjCompromise,
});

export const isObj = ObjCompromise.prototype.isObj;
