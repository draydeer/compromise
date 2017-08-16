"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var src_2 = require("../src");
var src_3 = require("../src");
var src_4 = require("../src");
describe('construct', function () {
    it('should construct ArrInvary from array', function () {
        var arr = src_1.construct([1, 2, 3]);
        expect(arr instanceof src_3.ArrInvary).toBeTruthy();
    });
    it('should construct ObjInvary from object', function () {
        var arr = src_1.construct({ a: 1, b: 2, c: 3 });
        expect(arr instanceof src_4.ObjInvary).toBeTruthy();
    });
});
describe('get', function () {
    it('should return value by existing path', function () {
        var arr = [1, { a: 1 }, 3, 4, 5];
        expect(src_1.get(arr, [1, 'a'], 0)).toBe(1);
        expect(src_1.get(arr, '1.a', 0)).toBe(1);
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        expect(src_1.get(obj, ['b', 'a'], 0)).toBe(1);
        expect(src_1.get(obj, 'b.a', 0)).toBe(1);
    });
    it('should return default value by not existing path', function () {
        var arr = [1, { a: 1 }, 3, 4, 5];
        expect(src_1.get(arr, [1, 'a', 'b'], 0)).toBe(0);
        expect(src_1.get(arr, '1.a.b', 0)).toBe(0);
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        expect(src_1.get(obj, ['b', 'a', 'b'], 0)).toBe(0);
        expect(src_1.get(obj, 'b.a.b', 0)).toBe(0);
    });
});
describe('set', function () {
    it('should not set same value then return same entity', function () {
        var arr = [1, { a: 1 }, 3, 4, 5];
        expect(src_1.set(arr, [1, 'a'], 1)).toBe(arr);
        expect(src_1.set(arr, '1.a', 1)).toBe(arr);
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        expect(src_1.set(obj, ['b', 'a'], 1)).toBe(obj);
        expect(src_1.set(obj, 'b.a', 1)).toBe(obj);
    });
    it('should set new value then return new entity', function () {
        var arr = [1, { a: 1 }, 3, 4, 5];
        expect(src_1.set(arr, [1, 'a'], 2)).not.toBe(arr);
        expect(src_1.set(arr, '1.a', 2)).not.toBe(arr);
        expect(arr).toEqual([1, { a: 1 }, 3, 4, 5]);
        expect(src_1.set(arr, '1.a', 2)).toEqual([1, { a: 2 }, 3, 4, 5]);
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        expect(src_1.set(obj, ['b', 'a'], 2)).not.toBe(obj);
        expect(src_1.set(obj, 'b.a', 2)).not.toBe(obj);
        expect(obj).toEqual({ a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 });
        expect(src_1.set(obj, 'b.a', 2)).toEqual({ a: 1, b: { a: 2 }, c: 3, d: 4, e: 5 });
    });
});
describe('all', function () {
    it('should not set same value then return same entity', function () {
        var arr = [1, { a: 1 }, 3, 4, 5];
        expect(src_1.all(arr, [1, 'a'], 1, [2], 3)).toBe(arr);
        expect(src_1.all(arr, '1.a', 1, '2', 3)).toBe(arr);
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        expect(src_1.all(obj, ['b', 'a'], 1, ['c'], 3)).toBe(obj);
        expect(src_1.all(obj, 'b.a', 1, 'c', 3)).toBe(obj);
    });
    it('should set new value then return new entity', function () {
        var arr = [1, { a: 1 }, 3, 4, 5];
        expect(src_1.all(arr, [1, 'a'], 2, [2], 4)).not.toBe(arr);
        expect(src_1.all(arr, '1.a', 2, '2', 4)).not.toBe(arr);
        expect(arr).toEqual([1, { a: 1 }, 3, 4, 5]);
        expect(src_1.all(arr, [1, 'a'], 2, [2], 4)).toEqual([1, { a: 2 }, 4, 4, 5]);
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        expect(src_1.all(obj, ['b', 'a'], 2, ['c'], 4)).not.toBe(obj);
        expect(src_1.all(obj, 'b.a', 2, 'c', 4)).not.toBe(obj);
        expect(obj).toEqual({ a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 });
        expect(src_1.all(obj, ['b', 'a'], 2, ['c'], 4)).toEqual({ a: 1, b: { a: 2 }, c: 4, d: 4, e: 5 });
    });
});
describe('setPatch', function () {
    it('should generate patch on same value then return empty patch', function () {
        var arr = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ar2 = src_1.setPatch(arr, [1, 'a'], 1);
        expect(arr).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ar2).toEqual({});
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        var ob2 = src_1.setPatch(obj, ['b', 'a'], 1);
        expect(obj).toEqual({ a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 });
        expect(ob2).toEqual({});
    });
    it('should generate patch on new value then return patch', function () {
        var arr = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ar2 = src_1.setPatch(arr, [1, 'a'], 2);
        expect(arr).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ar2).toEqual({ '1': { a: 2, b: 2 } });
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        var ob2 = src_1.setPatch(obj, ['b', 'a'], 2);
        expect(obj).toEqual({ a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 });
        expect(ob2).toEqual({ b: { a: 2 } });
    });
});
describe('allPatch', function () {
    it('should generate patch on same values then return empty patch', function () {
        var arr = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ar2 = src_1.allPatch(arr, [1, 'a'], 1, [2], 3);
        expect(arr).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ar2).toEqual({});
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        var ob2 = src_1.allPatch(obj, ['b', 'a'], 1, ['c'], 3);
        expect(obj).toEqual({ a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 });
        expect(ob2).toEqual({});
    });
    it('should generate patch on new values then return patch', function () {
        var arr = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ar2 = src_1.allPatch(arr, [1, 'a'], 1, [2], 3);
        expect(arr).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ar2).toEqual({});
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        var ob2 = src_1.allPatch(obj, ['b', 'a'], 2, ['c'], 4);
        expect(obj).toEqual({ a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 });
        expect(ob2).toEqual({ b: { a: 2 }, c: 4 });
    });
});
describe('allPatchCompare', function () {
    it('should generate patch on same values then return empty patch', function () {
        var arr = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ar2 = src_2.allPatchCompare(arr, [1, arr[1], 3, 4, 5]);
        expect(arr).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ar2).toEqual({});
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        var ob2 = src_2.allPatchCompare(obj, { a: 1, b: obj.b, c: 3, d: 4, e: 5 });
        expect(obj).toEqual({ a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 });
        expect(ob2).toEqual({});
    });
    it('should generate patch on new values then return patch', function () {
        var arr = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ar2 = src_2.allPatchCompare(arr, [1, { a: 1, b: 2 }, 3, 5, 5]);
        expect(arr).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ar2).toEqual({ '1': { a: 1, b: 2 }, '3': 5 });
        var obj = { a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 };
        var ob2 = src_2.allPatchCompare(obj, { a: 1, b: { a: 1 }, c: 3, d: 5, e: 5 });
        expect(obj).toEqual({ a: 1, b: { a: 1 }, c: 3, d: 4, e: 5 });
        expect(ob2).toEqual({ b: { a: 1 }, d: 5 });
    });
});
describe('applyIsArrayPatch', function () {
    it('should apply patch then return true by Array.isArray(ArrInvary instance)', function () {
        src_1.applyIsArrayPatch();
        expect(Array.isArray(new src_3.ArrInvary([]))).toBeTruthy();
    });
    it('should apply patch then return true by Array.isArray([])', function () {
        src_1.applyIsArrayPatch();
        expect(Array.isArray([])).toBeTruthy();
    });
    it('should apply patch then return false by Array.isArray(ObjInvary instance)', function () {
        src_1.applyIsArrayPatch();
        expect(Array.isArray(new src_4.ObjInvary([]))).toBeFalsy();
    });
    it('should apply patch then return false by Array.isArray({})', function () {
        src_1.applyIsArrayPatch();
        expect(Array.isArray({})).toBeFalsy();
    });
});
