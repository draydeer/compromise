"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe('objSet', function () {
    it('should not set same value then return same entity', function () {
        var obj = [1, { a: 1 }, 3, 4, 5];
        var ob2 = src_1.objSet(obj, [1, 'a'], 1);
        expect(obj).toEqual([1, { a: 1 }, 3, 4, 5]);
        expect(ob2).toBe(obj);
        expect(ob2.length).toBe(5);
        expect(ob2).toEqual([1, { a: 1 }, 3, 4, 5]);
    });
    it('should set new value then return new entity', function () {
        var obj = [1, { a: 1 }, 3, 4, 5];
        var ob2 = src_1.objSet(obj, [1, 'a'], 2);
        expect(obj).toEqual([1, { a: 1 }, 3, 4, 5]);
        expect(ob2).not.toBe(obj);
        expect(ob2.length).toBe(undefined);
        expect(ob2).toEqual([1, { a: 2 }, 3, 4, 5]);
    });
    it('should set new value by not existing patch then return new entity', function () {
        var obj = [1, { a: 1 }, 3, 4, 5];
        var ob2 = src_1.objSet(obj, [1, 'a', 'b'], 2);
        expect(obj).toEqual([1, { a: 1 }, 3, 4, 5]);
        expect(ob2).not.toBe(obj);
        expect(ob2.length).toBe(undefined);
        expect(ob2).toEqual([1, { a: { b: 2 } }, 3, 4, 5]);
    });
});
describe('objSetPatch', function () {
    it('should generate patch on same value then return empty patch', function () {
        var obj = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ob2 = src_1.objSetPatch(obj, [1, 'a'], 1);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob2).toEqual({});
    });
    it('should generate patch on new value then return patch', function () {
        var obj = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ob2 = src_1.objSetPatch(obj, [1, 'a'], 2);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob2).toEqual({ '1': { a: 2, b: 2 } });
    });
    it('should generate patch on new value by not existing patch then return patch', function () {
        var obj = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ob2 = src_1.objSetPatch(obj, [1, 'a', 'b'], 2);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob2).toEqual({ '1': { a: { b: 2 }, b: 2 } });
    });
});
describe('objAll', function () {
    it('should not set same values then return same entity', function () {
        var obj = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ob2 = src_1.objAll(obj, [1, 'a'], 1, [2], 3);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob2).toBe(obj);
        expect(ob2.length).toBe(5);
        expect(ob2).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
    });
    it('should set new values then return new entity', function () {
        var obj = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ob2 = src_1.objAll(obj, [1, 'a'], 2, [1, 'b'], 3, [2], 4);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob2).not.toBe(obj);
        expect(ob2.length).toBe(undefined);
        expect(ob2).toEqual([1, { a: 2, b: 3 }, 4, 4, 5]);
    });
    it('should set new values by not existing path then return new entity', function () {
        var obj = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ob2 = src_1.objAll(obj, [1, 'a'], 2, [1, 'b'], 3, [1, 'c', 'd'], 4, [2], 4);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob2).not.toBe(obj);
        expect(ob2.length).toBe(undefined);
        expect(ob2).toEqual([1, { a: 2, b: 3, c: { d: 4 } }, 4, 4, 5]);
        var ob3 = src_1.objAll(obj, [1, 'a'], 2);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob3).not.toBe(obj);
        expect(ob3.length).toBe(undefined);
        expect(ob3).toEqual([1, { a: 2, b: 2 }, 3, 4, 5]);
    });
});
describe('objAllPatch', function () {
    it('should generate patch on same values then return empty patch', function () {
        var obj = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ob2 = src_1.objAllPatch(obj, [1, 'a'], 1, [2], 3);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob2).toEqual({});
    });
    it('should generate patch on new values then return patch', function () {
        var obj = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ob2 = src_1.objAllPatch(obj, [1, 'a'], 2, [1, 'b'], 3, [2], 4);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob2).toEqual({ '1': { a: 2, b: 3 }, '2': 4 });
        var ob3 = src_1.objAllPatch(obj, [1, 'a'], 2);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob3).toEqual({ '1': { a: 2, b: 2 } });
    });
    it('should generate patch on new values by not existing path then return patch', function () {
        var obj = [1, { a: 1, b: 2 }, 3, 4, 5];
        var ob2 = src_1.objAllPatch(obj, [1, 'a'], 2, [1, 'b'], 3, [1, 'c', 'd'], 4, [2], 4);
        expect(obj).toEqual([1, { a: 1, b: 2 }, 3, 4, 5]);
        expect(ob2).toEqual({ '1': { a: 2, b: 3, c: { d: 4 } }, '2': 4 });
    });
});
