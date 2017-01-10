
import {isArr, Arr} from "../src/compromise/arr";
import {isObj, Obj} from "../src/compromise/obj";

describe('Arr', () => {
    it('should be created by factory from array then be instance of Arr', () => {
        const arr = Arr([1]);
        const obj = Obj({a: 1});

        expect(isArr(arr)).toBeTruthy();
        expect(isArr(obj)).toBeFalsy();
        expect(isArr([])).toBeFalsy();
        expect(arr instanceof Array).toBeTruthy();
        expect(arr instanceof Object).toBeTruthy();
    });

    it('should get value by key or return default', () => {
        const arr = Arr([1, {a: 2}]);

        expect(arr.get('0')).toBe(1);
        expect(arr.get('0', 2)).toBe(1);
        expect(arr.get('2', 2)).toBe(2);
        expect(arr.get('1.a')).toBe(2);
        expect(arr.get('1.a', 3)).toBe(2);
        expect(arr.get('1.b', 2)).toBe(2);
    });
});
