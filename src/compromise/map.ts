
const x = require('xxhashjs');

const SEED = 0x811c9dc5;
const SIZE = 32;
const SIZE_MASK = SIZE - 1;

function hash(str, seed?) {
    var hash = seed, i, char;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = char + (hash << 6) + (hash << 16) - hash;
    }
    return hash;

    let hval = seed || SEED;

    for (let i = 0, l = str.length; i < l; i ++) {
        hval ^= str.charCodeAt(i);
        hval += (hval >> 1) + (hval << 17);
    }

    return hval;
}

let incr = 0;
let seedFlow = SEED;

/**
 *
 */
class MapNode {

    public dict: any[];
    public seed: number;

    constructor(d?, seed?) {
        this.dict = d ? d.slice() : new Array(SIZE);
        this.seed = seed || (seedFlow = (seedFlow >> 16) ^ seedFlow + (incr += 1234567890));
    }

    public get(key: string, def?: any): any {
        let d: any[] = this.dict;
        let h = hash(key, this.seed) & SIZE_MASK;

        do {
            let v = d[h];

            if (v !== void 0) {
                if (false === (v instanceof MapNode)) {
                    return v[0] === key ? v[1] : def;
                }

                d = v.dict;
                h = hash(key, v.seed) & SIZE_MASK;
            } else {
                return def;
            }
        } while (true);
    }

    public set(key: string, val: any): MapNode {
        let d: any[] = this.dict;
        let h = hash(key, this.seed) & SIZE_MASK;

        do {
            let v = d[h];

            if (v !== void 0) {
                if (false === (v instanceof MapNode)) {
                    if (v[0] === key) {
                        v[1] = val;

                        return this;
                    }

                    v = d[h] = new MapNode().set(v[0], v[1]);
                }

                d = v.dict;
                h = hash(key, v.seed) & SIZE_MASK;
            } else {
                d[h] = [key, val];

                return this;
            }
        } while (true);
    }

    public clone() {
        return new MapNode(this.dict, this.seed);
    }

}

let hCache = new Array(64);
let hIndex = 0;

/**
 *
 */
class MapCompromise {

    n: MapNode;

    constructor(n?: MapNode) {
        this.n = n || new MapNode();
    }

    public get(key: string, def?: any): any {
        hIndex = 0;

        let d: any[] = this.n.dict;
        let h = hash(key, this.n.seed) & SIZE_MASK;

        do {
            let v = d[h];

            if (v !== void 0) {
                if (false === (v instanceof MapNode)) {
                    return v[0] === key ? v[1] : def;
                }

                hCache[hIndex ++] = h;

                d = v.dict;
                h = hash(key, v.seed) & SIZE_MASK;
            } else {
                return def;
            }
        } while (true);
    }

    public set(key: string, val: any): MapCompromise {
        if (this.get(key) === val) {
            return this;
        }

        let n: MapNode = this.n.clone();
        let m: MapCompromise = new MapCompromise(n);

        for (let i = 0; i < hIndex; i ++) {
            const ind = hCache[i];

            n = n.dict[ind] = n.dict[ind].clone();
        }

        n.set(key, val);

        return m;
    }

    public isMap(val: any): boolean {
        return val instanceof MapCompromise;
    }

}

export const Map = (val?): MapCompromise => new MapCompromise(val);
