"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe('ArrCompromise', function () {
    it('should be created by factory from array then be instance of ArrCompromise', function () {
        var arr = src_1.Arr([1]);
        expect(src_1.isArr(arr)).toBeTruthy();
        expect(src_1.isArr([])).toBeFalsy();
        expect(arr instanceof src_1.ArrCompromise).toBeTruthy();
        expect(arr instanceof Array).toBeTruthy();
        expect(arr instanceof Object).toBeTruthy();
    });
    it('should be constructed', function () {
        expect(new src_1.ArrCompromise() instanceof src_1.ArrCompromise).toBeTruthy();
        expect(new src_1.ArrCompromise([1]) instanceof src_1.ArrCompromise).toBeTruthy();
    });
    it('should get value by existing path', function () {
        var arr = src_1.Arr([1, { a: 2 }]);
        expect(arr.get('0', 2)).toBe(1);
        expect(arr.get('1.a')).toBe(2);
    });
    it('should get value by not existing path then return default', function () {
        var arr = src_1.Arr([1, { a: 2 }]);
        expect(arr.get('2', 2)).toBe(2);
        expect(arr.get('1.b', 2)).toBe(2);
    });
    it('should not set same value by existing path then return same instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }]);
        var ar2 = arr.set('0', 1);
        var ar3 = arr.set('1.a', 2);
        expect(ar2).toBe(arr);
        expect(ar3).toBe(arr);
    });
    it('should set new value by existing path then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }]);
        var ar2 = arr.set('0', 2);
        var ar3 = arr.set('1.a', 3);
        expect(ar2).not.toBe(arr);
        expect(ar3).not.toBe(arr);
        expect(arr[0]).toBe(1);
        expect(ar2[0]).toBe(2);
        expect(arr[1]).toBe(ar2[1]);
        expect(arr[1]).not.toBe(ar3[1]);
    });
    it('should not set all same values by existing path then return same instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }]);
        var ar2 = arr.all('0', 1, '1.a', 2);
        expect(ar2).toBe(arr);
    });
    it('should set all new values by existing path then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2, b: 2 }]);
        var ar2 = arr.all('0', 2, '1.a', 3, '1.b', 3);
        expect(arr).toEqual(src_1.Arr([1, { a: 2, b: 2 }]));
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(2);
        expect(ar2).toEqual(src_1.Arr([2, { a: 3, b: 3 }]));
        var ar3 = arr.all('0', 2);
        expect(arr).toEqual(src_1.Arr([1, { a: 2, b: 2 }]));
        expect(ar3).not.toBe(arr);
        expect(ar3.length).toBe(2);
        expect(ar3).toEqual(src_1.Arr([2, { a: 2, b: 2 }]));
    });
    it('should set all new values by not existing path then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2, b: 2 }]);
        var ar2 = arr.all('0', 2, '1.a', 3, '1.b.c', 3);
        expect(arr).toEqual(src_1.Arr([1, { a: 2, b: 2 }]));
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(2);
        expect(ar2).toEqual(src_1.Arr([2, { a: 3, b: { c: 3 } }]));
        var ar3 = arr.all('1.b.c', 3);
        expect(arr).toEqual(src_1.Arr([1, { a: 2, b: 2 }]));
        expect(ar3).not.toBe(arr);
        expect(ar3.length).toBe(2);
        expect(ar3).toEqual(src_1.Arr([1, { a: 2, b: { c: 3 } }]));
    });
    it('should delete element by index then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var ar2 = arr.deleteIndex(1);
        expect(arr).toEqual(src_1.Arr([1, { a: 2 }, 3, 4]));
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(3);
        expect(ar2).toEqual(src_1.Arr([arr[0], arr[2], arr[3]]));
    });
    it('should not delete element by not existing index then return same instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var ar2 = arr.deleteIndex(10);
        expect(arr).toEqual(src_1.Arr([1, { a: 2 }, 3, 4]));
        expect(ar2).toBe(arr);
        var ar3 = arr.deleteIndex(-1);
        expect(arr).toEqual(src_1.Arr([1, { a: 2 }, 3, 4]));
        expect(ar3).toBe(arr);
    });
    it('should insert element by index then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var ar2 = arr.insertIndex(1, 2);
        expect(arr).toEqual(src_1.Arr([1, { a: 2 }, 3, 4]));
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2).toEqual(src_1.Arr([arr[0], 2, arr[1], arr[2], arr[3]]));
    });
    it('should not insert element by not existing index then return same instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var ar2 = arr.insertIndex(10, 2);
        expect(arr).toEqual(src_1.Arr([1, { a: 2 }, 3, 4]));
        expect(ar2).toBe(arr);
        var ar3 = arr.insertIndex(-1, 2);
        expect(arr).toEqual(src_1.Arr([1, { a: 2 }, 3, 4]));
        expect(ar3).toBe(arr);
    });
    it('should push value then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var _a = arr.push(1), ar2 = _a[0], _ = _a[1];
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2).toEqual(src_1.Arr([arr[0], arr[1], arr[2], arr[3], 1]));
        expect(ar2[4]).toBe(1);
    });
    it('should pop value then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var _a = arr.pop(), ar2 = _a[0], _ = _a[1];
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(3);
        expect(ar2).toEqual(src_1.Arr([arr[0], arr[1], arr[2]]));
        expect(_).toBe(4);
    });
    it('should shift value then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var _a = arr.shift(), ar2 = _a[0], _ = _a[1];
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(3);
        expect(ar2).toEqual(src_1.Arr([arr[1], arr[2], arr[3]]));
        expect(_).toEqual(1);
    });
    it('should unshift value then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var _a = arr.unshift(5, 5), ar2 = _a[0], _ = _a[1];
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(6);
        expect(ar2).toEqual(src_1.Arr([5, 5, arr[0], arr[1], arr[2], arr[3]]));
        expect(_).toBe(6);
    });
    it('should slice then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var ar2 = arr.slice(1, 3);
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(2);
        expect(ar2).toEqual(src_1.Arr([arr[1], arr[2]]));
    });
    it('should call toJSON on JSON.stringify then return valid stringified json', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        expect(JSON.stringify(arr)).toBe('[1,{"a":2},3,4]');
    });
    it('should process batch operations then return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var ar2 = arr.batch(function (mutable) {
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
    it('should process nested batch operations return new instance of ArrCompromise', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        var ar2 = arr.batch(function (mutable1) {
            var ar3 = mutable1.batch(function (mutable2) {
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
    it('should freeze deeply', function () {
        var arr = src_1.Arr([1, { a: 2 }, 3, 4]);
        arr.freeze();
        function x() {
            arr[1].a = 3;
        }
        expect(x).toThrow();
    });
});
