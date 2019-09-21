import {Rec} from "../src/invary/rec";
import {Rec as RecDev} from "../src/invary/rec_dev_mode";
import {TRecInvary} from '../src/types';

interface IData {
    a: number;
    b: number;
    c: number;
}

const data = {a: 1, b: 2, c: 3};

function test(Rec: (props: IData) => TRecInvary<IData>) {
    describe('RecInvary', () => {
        it('should create RecInvary class', () => {
            const cls = Rec(data);

            expect(cls instanceof Function).toBeTruthy();
        });

        it('should create instance of rec class', () => {
            const cls = Rec(data);

            expect(new cls() instanceof cls).toBeTruthy();
        });

        it('should get RecInvary class default value by existing path', () => {
            const cls = Rec(data);

            expect(new cls().a).toBe(data.a);
        });

        it('should throw on set of unknown property', () => {
           const cls = Rec(data);

           function x() {
               new cls().set('d.e.f', 4);
           }

           expect(x).toThrow();
        });

        it('should not set same value by existing path then return same instance of RecInvary class', () => {
            const cls = Rec(data);
            const rec = new cls();
            const re2 = rec.set("a", data.a);

            expect(re2).toBe(rec);
        });

        it('should set new value by existing path then return new instance of RecInvary class', () => {
            const cls = Rec(data);
            const rec = new cls();
            const re2 = rec.set("a", 2).set("b", 3).set("c", 4);

            expect(re2 instanceof cls).toBeTruthy();
            expect(re2).not.toBe(rec);
            expect(re2.a).toBe(2);
            expect(re2.b).toBe(3);
            expect(re2.c).toBe(4);
        });
    });

    describe('RecInvary with custom properties', () => {
        it('should get value by existing path in custom properties', () => {
            const cls = Rec(data);

            expect(new cls({a: 2}).get('a')).toBe(2);
        });

        it('should return default value by not existing path in custom properties', () => {
            const cls = Rec(data);

            expect(new cls({a: 2}).get('a.b.c', 2)).toBe(2);
        });

        it('should set new value by existing path in custom properties then return new instance of RecInvary class', () => {
            const cls = Rec(data);
            const rec = new cls({a: 3});
            const re2 = rec.set("a", 2);

            expect(re2 instanceof cls).toBeTruthy();
            expect(re2).not.toBe(rec);
            expect(re2.a).toBe(2);
        });
    });
}

test(Rec);
test(RecDev);
