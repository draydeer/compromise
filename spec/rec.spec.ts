import {RecInvary} from "../src/invary/rec";

interface IData {
    a: number;
    b: number;
    c: number;
}

const data = {a: 1, b: 2, c: 3};

describe('RecInvary', () => {
    it('should create RecInvary class', () => {
        const cls = RecInvary<IData>(data);

        expect(cls instanceof Function).toBeTruthy();
    });

    it('should create instance of rec class', () => {
        const cls = RecInvary<IData>(data);

        expect(new cls() instanceof cls).toBeTruthy();
    });

    it('should get RecInvary class default value by existing path', () => {
        const cls = RecInvary<IData>(data);

        expect(new cls().a).toBe(data.a);
    });

    it('should get RecInvary class initialized value by existing path', () => {
        const cls = RecInvary<IData>(data);

        expect(new cls({a: 2}).a).toBe(2);
    });

    it('should throw on property set', () => {
        const cls = RecInvary<IData>(data);

        function x() {
            new cls().a = 4;
        }

        expect(x).toThrow();
    });

    it('should not set same value by existing path then return same instance of RecInvary class', () => {
        const cls = RecInvary<IData>(data);
        const rec = new cls();
        const re2 = rec.set("a", data.a);

        expect(re2).toBe(rec);
    });

    it('should set new value by existing path then return new instance of RecInvary class', () => {
        const cls = RecInvary<IData>(data);
        const rec = new cls();
        const re2 = rec.set("a", 2);

        expect(re2 instanceof cls).toBeTruthy();
        expect(re2).not.toBe(rec);
        expect(re2.a).toBe(2);
    });
});
