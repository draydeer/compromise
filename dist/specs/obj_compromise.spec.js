"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe('Obj', function () {
    it('should be created by factory from array then be instance of ObjCompromise', function () {
        var obj = src_1.Obj([1]);
        expect(src_1.isObj(obj)).toBeTruthy();
        expect(src_1.isObj([])).toBeFalsy();
        expect(obj instanceof src_1.ObjCompromise).toBeTruthy();
        expect(obj instanceof Array).toBeFalsy();
        expect(obj instanceof Object).toBeTruthy();
    });
    it('should be constructed', function () {
        expect(new src_1.ObjCompromise() instanceof src_1.ObjCompromise).toBeTruthy();
        expect(new src_1.ObjCompromise([1]) instanceof src_1.ObjCompromise).toBeTruthy();
    });
    it('should get value by existing path', function () {
        var obj = src_1.Obj([1, { a: 2 }]);
        expect(obj.get('0', 2)).toBe(1);
        expect(obj.get('1.a')).toBe(2);
    });
    it('should get value by not existing path then return default', function () {
        var obj = src_1.Obj([1, { a: 2 }]);
        expect(obj.get('2', 2)).toBe(2);
        expect(obj.get('1.b', 2)).toBe(2);
    });
    it('should not set same value by existing path then return same instance of ObjCompromise', function () {
        var obj = src_1.Obj([1, { a: 2 }]);
        var ob2 = obj.set('0', 1);
        var ob3 = obj.set('1.a', 2);
        expect(ob2).toBe(obj);
        expect(ob3).toBe(obj);
    });
    it('should set new value by existing path then return new instance of ObjCompromise', function () {
        var obj = src_1.Obj([1, { a: 2 }]);
        var ob2 = obj.set('0', 2);
        var ob3 = obj.set('1.a', 3);
        expect(ob2).not.toBe(obj);
        expect(ob3).not.toBe(obj);
        expect(obj[0]).toBe(1);
        expect(ob2[0]).toBe(2);
        expect(obj[1]).toBe(ob2[1]);
        expect(obj[1]).not.toBe(ob3[1]);
    });
    it('should not set all same values by existing path then return same instance of ObjCompromise', function () {
        var obj = src_1.Obj([1, { a: 2 }]);
        var ob2 = obj.all('0', 1, '1.a', 2);
        expect(ob2).toBe(obj);
    });
    it('should set all new values by existing path then return new instance of ObjCompromise', function () {
        var obj = src_1.Obj([1, { a: 2, b: 2 }]);
        var ob2 = obj.all('0', 2, '1.a', 3, '1.b', 3);
        expect(obj).toEqual(src_1.Obj([1, { a: 2, b: 2 }]));
        expect(ob2).not.toBe(obj);
        expect(ob2.length).toBe(undefined);
        expect(ob2).toEqual(src_1.Obj([2, { a: 3, b: 3 }]));
        var ob3 = obj.all('0', 2);
        expect(obj).toEqual(src_1.Obj([1, { a: 2, b: 2 }]));
        expect(ob3).not.toBe(obj);
        expect(ob3.length).toBe(undefined);
        expect(ob3).toEqual(src_1.Obj([2, { a: 2, b: 2 }]));
    });
    it('should set all new values by not existing path then return new instance of ObjCompromise', function () {
        var obj = src_1.Obj([1, { a: 2, b: 2 }]);
        var ob2 = obj.all('0', 2, '1.a', 3, '1.b.c', 3);
        expect(obj).toEqual(src_1.Obj([1, { a: 2, b: 2 }]));
        expect(ob2).not.toBe(obj);
        expect(ob2.length).toBe(undefined);
        expect(ob2).toEqual(src_1.Obj([2, { a: 3, b: { c: 3 } }]));
        var ob3 = obj.all('1.b.c', 3);
        expect(obj).toEqual(src_1.Obj([1, { a: 2, b: 2 }]));
        expect(ob3).not.toBe(obj);
        expect(ob3.length).toBe(undefined);
        expect(ob3).toEqual(src_1.Obj([1, { a: 2, b: { c: 3 } }]));
    });
    it('should process nested batch operations', function () {
        var obj = src_1.Obj([1, { a: 2 }, 3, 4]);
        var ob2 = obj.batch(function (mutable1) {
            var ob3 = mutable1.batch(function (mutable2) {
                mutable2 = mutable2.set([0], 3);
                expect(mutable2).not.toBe(obj);
                expect(mutable2).not.toBe(ob2);
                return mutable2;
            });
            mutable1 = mutable1.set([0], 2);
            expect(mutable1).not.toBe(obj);
            expect(mutable1).not.toBe(ob3);
            return mutable1;
        });
    });
    it('should freeze deeply', function () {
        var obj = src_1.Obj([1, { a: 2 }, 3, 4]);
        obj.freeze();
        function x() {
            obj[1].a = 3;
        }
        expect(x).toThrow();
    });
});
