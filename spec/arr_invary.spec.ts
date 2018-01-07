import {isArr, Arr, ArrInvary} from "../src/invary/arr";
import {isArr as isArrDev, Arr as ArrDev, ArrInvary as ArrInvaryDev} from "../src/invary/arr_dev_mode";

function test(isArr, Arr, ArrInvary) {
    describe('ArrInvary', () => {
        it('should be created by factory from array then be instance of ArrInvary', () => {
            const arr = Arr([1]);

            expect(isArr(arr)).toBeTruthy();
            expect(isArr([])).toBeFalsy();
            expect(arr instanceof ArrInvary).toBeTruthy();
            expect(arr instanceof Array).toBeTruthy();
            expect(arr instanceof Object).toBeTruthy();
        });

        it('should be constructed', () => {
            expect(new ArrInvary() instanceof ArrInvary).toBeTruthy();
            expect(new ArrInvary([1]) instanceof ArrInvary).toBeTruthy();
        });

        it('should get value by existing path', () => {
            const arr = Arr([1, {a: 2}]);

            expect(arr.get('0', 2)).toBe(1);
            expect(arr.get('1.a')).toBe(2);
        });

        it('should get value by not existing path then return default', () => {
            const arr = Arr([1, {a: 2}]);

            expect(arr.get('2', 2)).toBe(2);
            expect(arr.get('1.b', 2)).toBe(2);
        });

        it('should not set same value by existing path then return same instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}]);
            const ar2:any = arr.set('0', 1);
            const ar3:any = arr.set('1.a', 2);

            expect(ar2).toBe(arr);
            expect(ar3).toBe(arr);
        });

        it('should set new value by existing path then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}]);
            const ar2:any = arr.set('0', 2);
            const ar3:any = arr.set('1.a', 3);

            expect(ar2).not.toBe(arr);
            expect(ar3).not.toBe(arr);
            expect(arr[0]).toBe(1);
            expect(ar2[0]).toBe(2);
            expect(arr[1]).toBe(ar2[1]);
            expect(arr[1]).not.toBe(ar3[1]);
        });

        it('should not set all same values by existing path then return same instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}]);
            const ar2:any = arr.all(
                '0', 1,
                '1.a', 2
            );

            expect(ar2).toBe(arr);
        });

        it('should set all new values by existing path then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2, b: 2}]);
            const ar2:any = arr.all(
                '0', 2, '1.a', 3, '1.b', 3
            );

            expect(arr).toEqual(Arr([1, {a: 2, b: 2}]));
            expect(ar2).not.toBe(arr);
            expect(ar2.length).toBe(2);
            expect(ar2).toEqual(Arr([2, {a: 3, b: 3}]));

            const ar3:any = arr.all(
                '0', 2
            );

            expect(arr).toEqual(Arr([1, {a: 2, b: 2}]));
            expect(ar3).not.toBe(arr);
            expect(ar3.length).toBe(2);
            expect(ar3).toEqual(Arr([2, {a: 2, b: 2}]));
        });

        it('should set all new values by not existing path then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2, b: 2}]);
            const ar2:any = arr.all(
                '0', 2, '1.a', 3, '1.b.c', 3
            );

            expect(arr).toEqual(Arr([1, {a: 2, b: 2}]));
            expect(ar2).not.toBe(arr);
            expect(ar2.length).toBe(2);
            expect(ar2).toEqual(Arr([2, {a: 3, b: {c: 3}}]));

            const ar3:any = arr.all(
                '1.b.c', 3
            );

            expect(arr).toEqual(Arr([1, {a: 2, b: 2}]));
            expect(ar3).not.toBe(arr);
            expect(ar3.length).toBe(2);
            expect(ar3).toEqual(Arr([1, {a: 2, b: {c: 3}}]));
        });

        it('should delete element by index then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);
            const ar2:any = arr.deleteIndex(1);

            expect(arr).toEqual(Arr([1, {a: 2}, 3, 4]));
            expect(ar2).not.toBe(arr);
            expect(ar2.length).toBe(3);
            expect(ar2).toEqual(Arr([arr[0], arr[2], arr[3]]));
        });

        it('should not delete element by not existing index then return same instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);
            const ar2:any = arr.deleteIndex(10);

            expect(arr).toEqual(Arr([1, {a: 2}, 3, 4]));
            expect(ar2).toBe(arr);

            const ar3:any = arr.deleteIndex(-1);

            expect(arr).toEqual(Arr([1, {a: 2}, 3, 4]));
            expect(ar3).toBe(arr);
        });

        it('should insert element by index then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);
            const ar2:any = arr.insertIndex(1, 2);

            expect(arr).toEqual(Arr([1, {a: 2}, 3, 4]));
            expect(ar2).not.toBe(arr);
            expect(ar2.length).toBe(5);
            expect(ar2).toEqual(Arr([arr[0], 2, arr[1], arr[2], arr[3]]));
        });

        it('should not insert element by not existing index then return same instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);
            const ar2:any = arr.insertIndex(10, 2);

            expect(arr).toEqual(Arr([1, {a: 2}, 3, 4]));
            expect(ar2).toBe(arr);

            const ar3:any = arr.insertIndex(-1, 2);

            expect(arr).toEqual(Arr([1, {a: 2}, 3, 4]));
            expect(ar3).toBe(arr);
        });

        it('should push value then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);
            const [ar2, _] = arr.push(1);

            expect(ar2).not.toBe(arr);
            expect(ar2.length).toBe(5);
            expect(ar2).toEqual(Arr([arr[0], arr[1], arr[2], arr[3], 1]));
            expect(ar2[4]).toBe(1);
        });

        it('should pop value then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);
            const [ar2, _] = arr.pop();

            expect(ar2).not.toBe(arr);
            expect(ar2.length).toBe(3);
            expect(ar2).toEqual(Arr([arr[0], arr[1], arr[2]]));
            expect(_).toBe(4);
        });

        it('should shift value then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);
            const [ar2, _] = arr.shift();

            expect(ar2).not.toBe(arr);
            expect(ar2.length).toBe(3);
            expect(ar2).toEqual(Arr([arr[1], arr[2], arr[3]]));
            expect(_).toEqual(1);
        });

        it('should unshift value then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);
            const [ar2, _] = arr.unshift(5, 5);

            expect(ar2).not.toBe(arr);
            expect(ar2.length).toBe(6);
            expect(ar2).toEqual(Arr([5, 5, arr[0], arr[1], arr[2], arr[3]]));
            expect(_).toBe(6);
        });

        it('should slice then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);
            const ar2 = arr.slice(1, 3);

            expect(ar2).not.toBe(arr);
            expect(ar2.length).toBe(2);
            expect(ar2).toEqual(Arr([arr[1], arr[2]]));
        });

        it('should call toJSON on JSON.stringify then return valid stringified json', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);

            expect(JSON.stringify(arr)).toBe('[1,{"a":2},3,4]');
        });

        it('should process batch operations then return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);

            const ar2:any = arr.batch((mutable) => {
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

        it('should process nested batch operations return new instance of ArrInvary', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);

            const ar2:any = arr.batch((mutable1) => {
                const ar3:any = mutable1.batch((mutable2) => {
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

        it('should freeze deeply', () => {
            const arr:any = Arr([1, {a: 2}, 3, 4]);

            arr.freeze();

            function x() {
                arr[1].a = 3;
            }

            expect(x).toThrow();
        });
    });
}

test(isArr, Arr, ArrInvary);
test(isArrDev, ArrDev, ArrInvaryDev);
