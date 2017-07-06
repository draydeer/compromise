"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var obj_1 = require("../src/compromise/obj");
describe('Obj', function () {
    it('should be created by factory from object then be instance of Obj', function () {
        var obj = obj_1.Obj({ a: 1 });
        expect(obj_1.isObj(obj)).toBeTruthy();
        expect(obj_1.isObj({})).toBeFalsy();
        expect(obj instanceof Array).toBeFalsy();
        expect(obj instanceof Object).toBeTruthy();
    });
    it('should get value by key or return default', function () {
        var obj = obj_1.Obj({ a: 1, b: { a: 2 } });
        expect(obj.get('a')).toBe(1);
        expect(obj.get('a', 2)).toBe(1);
        expect(obj.get('c', 2)).toBe(2);
        expect(obj.get('b.a')).toBe(2);
        expect(obj.get('b.a', 3)).toBe(2);
        expect(obj.get('b.c', 2)).toBe(2);
    });
    it('should set old value and return same instance of Obj', function () {
        var obj = obj_1.Obj({ a: 1, b: { a: 2 } });
        var ob2 = obj.set('a', 1);
        var ob3 = obj.set('b.a', 2);
        expect(ob2).toBe(obj);
        expect(ob3).toBe(obj);
    });
    it('should set new value and return new instance of Obj', function () {
        var obj = obj_1.Obj({ a: 1, b: { a: 2 } });
        var ob2 = obj.set('a', 2);
        var ob3 = obj.set('b.a', 3);
        expect(ob2).not.toBe(obj);
        expect(ob3).not.toBe(obj);
        expect(obj.a).toBe(1);
        expect(ob2.a).toBe(2);
        expect(obj.b).toBe(ob2.b);
        expect(obj.b).not.toBe(ob3[1]);
    });
});
