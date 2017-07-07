"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arr_1 = require("../src/compromise/arr");
describe('Arr', function () {
    it('should be created by factory from array then be instance of Arr', function () {
        var arr = arr_1.Arr([1]);
        expect(arr_1.isArr(arr)).toBeTruthy();
        expect(arr_1.isArr([])).toBeFalsy();
        expect(arr instanceof Array).toBeTruthy();
        expect(arr instanceof Object).toBeTruthy();
    });
    it('should get value by key or return default', function () {
        var arr = arr_1.Arr([1, { a: 2 }]);
        expect(arr.get('0')).toBe(1);
        expect(arr.get('0', 2)).toBe(1);
        expect(arr.get('2', 2)).toBe(2);
        expect(arr.get('1.a')).toBe(2);
        expect(arr.get('1.a', 3)).toBe(2);
        expect(arr.get('1.b', 2)).toBe(2);
    });
    it('should set old value and return same instance of Arr', function () {
        var arr = arr_1.Arr([1, { a: 2 }]);
        var ar2 = arr.set('0', 1);
        var ar3 = arr.set('1.a', 2);
        expect(ar2).toBe(arr);
        expect(ar3).toBe(arr);
    });
    it('should set new value and return new instance of Arr', function () {
        var arr = arr_1.Arr([1, { a: 2 }]);
        var ar2 = arr.set('0', 2);
        var ar3 = arr.set('1.a', 3);
        expect(ar2).not.toBe(arr);
        expect(ar3).not.toBe(arr);
        expect(arr[0]).toBe(1);
        expect(ar2[0]).toBe(2);
        expect(arr[1]).toBe(ar2[1]);
        expect(arr[1]).not.toBe(ar3[1]);
    });
    it('should delete element by index and return new instance of Arr', function () {
        var arr = arr_1.Arr([1, { a: 2 }, 3, 4]);
        var ar2 = arr.deleteIndex(1);
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(3);
        expect(ar2[0]).toBe(arr[0]);
        expect(ar2[1]).toBe(arr[2]);
        expect(ar2[2]).toBe(arr[3]);
    });
    it('should insert element by index and return new instance of Arr', function () {
        var arr = arr_1.Arr([1, { a: 2 }, 3, 4]);
        var ar2 = arr.insertIndex(1, 2);
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2[0]).toBe(arr[0]);
        expect(ar2[1]).toBe(2);
        expect(ar2[2]).toBe(arr[1]);
    });
});
