import {isArr, Arr, ArrCompromise} from "../src/compromise/arr";
import {isObj, Obj, ObjCompromise} from "../src/compromise/obj";

describe('Arr', () => {
    it('should be created by factory from array then be instance of Arr', () => {
        const arr = Arr([1]);

        expect(isArr(arr)).toBeTruthy();
        expect(isArr([])).toBeFalsy();
        expect(arr instanceof Array).toBeTruthy();
        expect(arr instanceof Object).toBeTruthy();
    });

    it('should get value by key or return default', () => {
        const arr = Arr([1, {a: 2}]);

        expect(arr.get('0')).toBe(1);
        expect(arr.get('0', 2)).toBe(1);
        expect(arr.get('2', 2)).toBe(2);
        expect(arr.get('1.a')).toBe(2);
        expect(arr.get('1.a', 3)).toBe(2);
        expect(arr.get('1.b', 2)).toBe(2);
    });

    it('should set old value and return same instance of Arr', () => {
        const arr: any = Arr([1, {a: 2}]);
        const ar2: any = arr.set('0', 1);
        const ar3: any = arr.set('1.a', 2);

        expect(ar2).toBe(arr);
        expect(ar3).toBe(arr);
    });

    it('should set new value and return new instance of Arr', () => {
        const arr: any = Arr([1, {a: 2}]);
        const ar2: any = arr.set('0', 2);
        const ar3: any = arr.set('1.a', 3);

        expect(ar2).not.toBe(arr);
        expect(ar3).not.toBe(arr);
        expect(arr[0]).toBe(1);
        expect(ar2[0]).toBe(2);
        expect(arr[1]).toBe(ar2[1]);
        expect(arr[1]).not.toBe(ar3[1]);
    });

    it('should delete element by index and return new instance of Arr', () => {
        const arr: any = Arr([1, {a: 2}, 3, 4]);
        const ar2: any = arr.deleteIndex(1);

        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(3);
        expect(ar2[0]).toBe(arr[0]);
        expect(ar2[1]).toBe(arr[2]);
        expect(ar2[2]).toBe(arr[3]);
    });

    it('should insert element by index and return new instance of Arr', () => {
        const arr: any = Arr([1, {a: 2}, 3, 4]);
        const ar2: any = arr.insertIndex(1, 2);

        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2[0]).toBe(arr[0]);
        expect(ar2[1]).toBe(2);
        expect(ar2[2]).toBe(arr[1]);
    });

    it('should push value and return new instance of Arr', () => {
        const arr: any = Arr([1, {a: 2}, 3, 4]);
        const [ar2, _] = arr.push(1);

        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2[4]).toBe(1);
    });

    it('should pop value and return new instance of Arr', () => {
        const arr: any = Arr([1, {a: 2}, 3, 4]);
        const [ar2, _] = arr.pop();

        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(3);
        expect(_).toBe(4);
    });

    it('should process batch operations and return new instance of Arr', () => {
        const arr: any = Arr([1, {a: 2}, 3, 4]);

        const ar2: any = arr.batch((mutable) => {
            mutable = mutable.set([0], 2);

            expect(mutable).not.toBe(arr);
            expect(mutable[0]).toBe(2);

            mutable = mutable.set([0], 3);

            expect(mutable).toBe(mutable);
            expect(mutable[0]).toBe(3);

            mutable = mutable.all([0], 4, [1], 5);

            expect(mutable).toBe(mutable);
            expect(mutable[0]).toBe(4);
            expect(mutable[1]).toBe(5);

            mutable = mutable.push(3)[0];

            expect(mutable).toBe(mutable);
            expect(mutable[4]).toBe(3);
            expect(mutable.length).toBe(5);

            mutable = mutable.pop()[0];

            expect(mutable).toBe(mutable);
            expect(mutable[3]).toBe(4);
            expect(mutable.length).toBe(4);

            mutable = mutable.shift()[0];

            expect(mutable).toBe(mutable);
            expect(mutable[0]).toBe(5);
            expect(mutable.length).toBe(3);

            mutable = mutable.unshift(2)[0];

            expect(mutable).toBe(mutable);
            expect(mutable[0]).toBe(2);
            expect(mutable.length).toBe(4);

            return mutable;
        });

        expect(ar2).not.toBe(arr);
    });

    it('should process nested batch operations', () => {
        const arr: any = Arr([1, {a: 2}, 3, 4]);

        const ar2: any = arr.batch((mutable1) => {
            const ar3: any = mutable1.batch((mutable2) => {
                mutable2 = mutable2.set([0], 3);

                expect(mutable2).not.toBe(arr);
                expect(mutable2).not.toBe(ar2);

                return mutable2;
            });

            mutable1 = mutable1.set([0], 2);

            expect(mutable1).not.toBe(arr);
            expect(mutable1).not.toBe(ar3);

            return mutable1;
        });
    });
});
