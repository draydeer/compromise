import {isArr, Arr} from "../src/compromise/arr";
import {isObj, Obj} from "../src/compromise/obj";

describe('Obj', () => {
    it('should be created by factory from object then be instance of Obj', () => {
        const obj = Obj({a: 1, b: {a: 1}});

        expect(isObj(obj)).toBeTruthy();
        expect(isObj({})).toBeFalsy();
        expect(obj instanceof Array).toBeFalsy();
        expect(obj instanceof Object).toBeTruthy();
    });

    it('should get value by key or return default', () => {
        const obj = Obj({a: 1, b: {a: 2}});

        expect(obj.get('a')).toBe(1);
        expect(obj.get('a', 2)).toBe(1);
        expect(obj.get('c', 2)).toBe(2);
        expect(obj.get('b.a')).toBe(2);
        expect(obj.get('b.a', 3)).toBe(2);
        expect(obj.get('b.c', 2)).toBe(2);
    });

    it('should set old value and return same instance of Obj', () => {
        const obj: any = Obj({a: 1, b: {a: 2}});
        const ob2: any = obj.set('a', 1);
        const ob3: any = obj.set('b.a', 2);

        expect(ob2).toBe(obj);
        expect(ob3).toBe(obj);
    });

    it('should set new value and return new instance of Obj', () => {
        const obj: any = Obj({a: 1, b: {a: 2}});
        const ob2: any = obj.set('a', 2);
        const ob3: any = obj.set('b.a', 3);

        expect(ob2).not.toBe(obj);
        expect(ob3).not.toBe(obj);
        expect(obj.a).toBe(1);
        expect(ob2.a).toBe(2);
        expect(obj.b).toBe(ob2.b);
        expect(obj.b).not.toBe(ob3[1]);
    });

    it('should process nested batch operations', () => {
        const arr: any = Obj({a: 1, b: {a: 2}});

        const ar2: any = arr.batch((mutable1) => {
            const ar3: any = mutable1.batch((mutable2) => {
                mutable2 = mutable2.set(['a'], 3);

                expect(mutable2).not.toBe(arr);
                expect(mutable2).not.toBe(ar2);

                return mutable2;
            });

            mutable1 = mutable1.set(['a'], 2);

            expect(mutable1).not.toBe(arr);
            expect(mutable1).not.toBe(ar3);

            return mutable1;
        });
    });
});
