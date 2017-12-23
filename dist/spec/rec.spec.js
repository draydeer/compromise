"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rec_1 = require("../src/invary/rec");
var data = { a: 1, b: 2, c: 3 };
describe('RecInvary', function () {
    it('should create RecInvary class', function () {
        var cls = rec_1.RecInvary(data);
        expect(cls instanceof Function).toBeTruthy();
    });
    it('should create instance of rec class', function () {
        var cls = rec_1.RecInvary(data);
        expect(new cls() instanceof cls).toBeTruthy();
    });
    it('should get RecInvary class default value by existing path', function () {
        var cls = rec_1.RecInvary(data);
        expect(new cls().a).toBe(data.a);
    });
    it('should get RecInvary class initialized value by existing path', function () {
        var cls = rec_1.RecInvary(data);
        expect(new cls({ a: 2 }).a).toBe(2);
    });
    it('should throw on property set', function () {
        var cls = rec_1.RecInvary(data);
        function x() {
            new cls().a = 4;
        }
        expect(x).toThrow();
    });
    it('should not set same value by existing path then return same instance of RecInvary class', function () {
        var cls = rec_1.RecInvary(data);
        var rec = new cls();
        var re2 = rec.set("a", data.a);
        expect(re2).toBe(rec);
    });
    it('should set new value by existing path then return new instance of RecInvary class', function () {
        var cls = rec_1.RecInvary(data);
        var rec = new cls();
        var re2 = rec.set("a", 2);
        expect(re2 instanceof cls).toBeTruthy();
        expect(re2).not.toBe(rec);
        expect(re2.a).toBe(2);
    });
});
