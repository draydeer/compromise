import {
    Context,
    anyGetInContext
} from "../lib";
import {
    TKey,
    TRecInvary
} from "../types";
import {
    objSetDirect,
    objSetDirectMutable
} from "./obj";

export function Rec<T>(props: T): TRecInvary<T> {
    class RecInvary {
        constructor(props?: Partial<T>) {
            (<any>this).__props = function () {
                return props
            };
        }

        public set(key: TKey, val: any) {
            if (anyGetInContext.call(this, key) === val) {
                return this;
            }

            let p = (<any>this).__props();

            if (p) {
                return new RecInvary(objSetDirect(p, key, val));
            }

            return new RecInvary(objSetDirectMutable({}, key, val));
        };
    }

    for (let k in props) {
        if (props.hasOwnProperty(k)) {
            (<any>Object).defineProperty(RecInvary.prototype, k, {
                get: function() {
                    let p = (<any>this).__props();

                    return p && k in p ? p[k] : props[k];
                }
            });
        }
    }

    return <TRecInvary<T>>RecInvary;
}
