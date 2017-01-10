
import {isArr, Arr} from "../src/compromise/arr";
import {isObj, Obj} from "../src/compromise/obj";

describe('Obj', () => {
    it('should be created by factory from object then be instance of Obj', () => {
        const arr = Arr([1]);
        const obj = Obj({a: 1});

        expect(isObj(arr)).toBeFalsy();
        expect(isObj(obj)).toBeTruthy();
        expect(isObj({})).toBeFalsy();
        expect(obj instanceof Array).toBeFalsy();
        expect(obj instanceof Object).toBeTruthy();
    });

    it('should get value by key or return default', () => {
        const obj = Obj({a: 1, b: {a: 2}});

        expect(obj.get('a')).toBe(1);
        expect(obj.get('a', 2)).toBe(1);
        expect(obj.get('c', 2)).toBe(2);
        expect(obj.get('b.a')).toBe(2);
        expect(obj.get('b.a', 3)).toBe(2);
        expect(obj.get('b.c', 2)).toBe(2);
    });
});
