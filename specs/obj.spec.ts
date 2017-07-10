import {objSet, objSetPatch, objAll, objAllPatch} from "../src";

describe('objSet', () => {
    it('should not set same value then return same entity', () => {
        const obj = [1, {a: 1}, 3, 4, 5];
        const ob2 = objSet(obj, [1, 'a'], 1);

        expect(obj).toEqual([1, {a: 1}, 3, 4, 5]);
        expect(ob2).toBe(obj);
        expect(ob2.length).toBe(5);
        expect(ob2).toEqual([1, {a: 1}, 3, 4, 5]);
    });

    it('should set new value then return new entity', () => {
        const obj = [1, {a: 1}, 3, 4, 5];
        const ob2 = objSet(obj, [1, 'a'], 2);

        expect(obj).toEqual([1, {a: 1}, 3, 4, 5]);
        expect(ob2).not.toBe(obj);
        expect(ob2.length).toBe(undefined);
        expect(ob2).toEqual([1, {a: 2}, 3, 4, 5]);
    });

    it('should set new value by not existing patch then return new entity', () => {
        const obj = [1, {a: 1}, 3, 4, 5];
        const ob2 = objSet(obj, [1, 'a', 'b'], 2);

        expect(obj).toEqual([1, {a: 1}, 3, 4, 5]);
        expect(ob2).not.toBe(obj);
        expect(ob2.length).toBe(undefined);
        expect(ob2).toEqual([1, {a: {b: 2}}, 3, 4, 5]);
    });
});

describe('objSetPatch', () => {
    it('should generate patch on same value then return empty patch', () => {
        const obj = [1, {a: 1, b: 2}, 3, 4, 5];
        const ob2 = objSetPatch(obj, [1, 'a'], 1);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob2).toEqual({});
    });

    it('should generate patch on new value then return patch', () => {
        const obj = [1, {a: 1, b: 2}, 3, 4, 5];
        const ob2 = objSetPatch(obj, [1, 'a'], 2);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob2).toEqual({'1': {a: 2, b: 2}});
    });

    it('should generate patch on new value by not existing patch then return patch', () => {
        const obj = [1, {a: 1, b: 2}, 3, 4, 5];
        const ob2 = objSetPatch(obj, [1, 'a', 'b'], 2);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob2).toEqual({'1': {a: {b: 2}, b: 2}});
    });
});

describe('objAll', () => {
    it('should not set same values then return same entity', () => {
        const obj = [1, {a: 1, b: 2}, 3, 4, 5];
        const ob2 = objAll(obj, [1, 'a'], 1, [2], 3);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob2).toBe(obj);
        expect(ob2.length).toBe(5);
        expect(ob2).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
    });

    it('should set new values then return new entity', () => {
        const obj = [1, {a: 1, b: 2}, 3, 4, 5];
        const ob2 = objAll(obj, [1, 'a'], 2, [1, 'b'], 3, [2], 4);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob2).not.toBe(obj);
        expect(ob2.length).toBe(undefined);
        expect(ob2).toEqual([1, {a: 2, b: 3}, 4, 4, 5]);
    });

    it('should set new values by not existing path then return new entity', () => {
        const obj = [1, {a: 1, b: 2}, 3, 4, 5];
        const ob2 = objAll(obj, [1, 'a'], 2, [1, 'b'], 3, [1, 'c', 'd'], 4, [2], 4);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob2).not.toBe(obj);
        expect(ob2.length).toBe(undefined);
        expect(ob2).toEqual([1, {a: 2, b: 3, c: {d: 4}}, 4, 4, 5]);

        const ob3 = objAll(obj, [1, 'a'], 2);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob3).not.toBe(obj);
        expect(ob3.length).toBe(undefined);
        expect(ob3).toEqual([1, {a: 2, b: 2}, 3, 4, 5]);
    });
});

describe('objAllPatch', () => {
    it('should generate patch on same values then return empty patch', () => {
        const obj = [1, {a: 1, b: 2}, 3, 4, 5];
        const ob2 = objAllPatch(obj, [1, 'a'], 1, [2], 3);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob2).toEqual({});
    });

    it('should generate patch on new values then return patch', () => {
        const obj = [1, {a: 1, b: 2}, 3, 4, 5];
        const ob2 = objAllPatch(obj, [1, 'a'], 2, [1, 'b'], 3, [2], 4);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob2).toEqual({'1': {a: 2, b: 3}, '2': 4});

        const ob3 = objAllPatch(obj, [1, 'a'], 2);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob3).toEqual({'1': {a: 2, b: 2}});
    });

    it('should generate patch on new values by not existing path then return patch', () => {
        const obj = [1, {a: 1, b: 2}, 3, 4, 5];
        const ob2 = objAllPatch(obj, [1, 'a'], 2, [1, 'b'], 3, [1, 'c', 'd'], 4, [2], 4);

        expect(obj).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ob2).toEqual({'1': {a: 2, b: 3, c: {d: 4}}, '2': 4});
    });
});
