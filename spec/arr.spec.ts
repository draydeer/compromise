import {arrSet, arrSetPatch, arrAll, arrAllPatch} from "../src";

describe('arrSet', () => {
    it('should not set same value then return same entity', () => {
        const arr = [1, {a: 1}, 3, 4, 5];
        const ar2 = arrSet(arr, [1, 'a'], 1);

        expect(arr).toEqual([1, {a: 1}, 3, 4, 5]);
        expect(ar2).toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2).toEqual([1, {a: 1}, 3, 4, 5]);
    });

    it('should set new value then return new entity', () => {
        const arr = [1, {a: 1}, 3, 4, 5];
        const ar2 = arrSet(arr, [1, 'a'], 2);

        expect(arr).toEqual([1, {a: 1}, 3, 4, 5]);
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2).toEqual([1, {a: 2}, 3, 4, 5]);
    });

    it('should set new value by not existing patch then return new entity', () => {
        const arr = [1, {a: 1}, 3, 4, 5];
        const ar2 = arrSet(arr, [1, 'a', 'b'], 2);

        expect(arr).toEqual([1, {a: 1}, 3, 4, 5]);
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2).toEqual([1, {a: {b: 2}}, 3, 4, 5]);
    });
});

describe('arrSetPatch', () => {
    it('should generate patch on same value then return empty patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = arrSetPatch(arr, [1, 'a'], 1);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({});
    });

    it('should generate patch on new value then return patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = arrSetPatch(arr, [1, 'a'], 2);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({'1': {a: 2, b: 2}});
    });

    it('should generate patch on new value by not existing patch then return patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = arrSetPatch(arr, [1, 'a', 'b'], 2);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({'1': {a: {b: 2}, b: 2}});
    });
});

describe('arrAll', () => {
    it('should not set same values then return same entity', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = arrAll(arr, [1, 'a'], 1, [2], 3);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
    });

    it('should set new values then return new entity', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = arrAll(arr, [1, 'a'], 2, [1, 'b'], 3, [2], 4);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2).toEqual([1, {a: 2, b: 3}, 4, 4, 5]);
    });

    it('should set new values by not existing path then return new entity', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = arrAll(arr, [1, 'a'], 2, [1, 'b'], 3, [1, 'c', 'd'], 4, [2], 4);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).not.toBe(arr);
        expect(ar2.length).toBe(5);
        expect(ar2).toEqual([1, {a: 2, b: 3, c: {d: 4}}, 4, 4, 5]);

        const ar3 = arrAll(arr, [1, 'a'], 2);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar3).not.toBe(arr);
        expect(ar3.length).toBe(5);
        expect(ar3).toEqual([1, {a: 2, b: 2}, 3, 4, 5]);
    });
});

describe('arrAllPatch', () => {
    it('should generate patch on same values then return empty patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = arrAllPatch(arr, [1, 'a'], 1, [2], 3);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({});
    });

    it('should generate patch on new values then return patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = arrAllPatch(arr, [1, 'a'], 2, [1, 'b'], 3, [2], 4);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({'1': {a: 2, b: 3}, '2': 4});

        const ar3 = arrAllPatch(arr, [1, 'a'], 2);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar3).toEqual({'1': {a: 2, b: 2}});
    });

    it('should generate patch on new values by not existing path then return patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = arrAllPatch(arr, [1, 'a'], 2, [1, 'b'], 3, [1, 'c', 'd'], 4, [2], 4);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({'1': {a: 2, b: 3, c: {d: 4}}, '2': 4});
    });
});
