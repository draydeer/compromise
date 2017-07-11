import {get, set, setPatch, all, allPatch} from "../src";
import {allPatchCompare} from "../src/index";

describe('get', () => {
    it('should return value by existing path', () => {
        const arr = [1, {a: 1}, 3, 4, 5];

        expect(get(arr, [1, 'a'], 0)).toBe(1);
        expect(get(arr, '1.a', 0)).toBe(1);

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};

        expect(get(obj, ['b', 'a'], 0)).toBe(1);
        expect(get(obj, 'b.a', 0)).toBe(1);
    });

    it('should return default value by not existing path', () => {
        const arr = [1, {a: 1}, 3, 4, 5];

        expect(get(arr, [1, 'a', 'b'], 0)).toBe(0);
        expect(get(arr, '1.a.b', 0)).toBe(0);

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};

        expect(get(obj, ['b', 'a', 'b'], 0)).toBe(0);
        expect(get(obj, 'b.a.b', 0)).toBe(0);
    });
});

describe('set', () => {
    it('should not set same value then return same entity', () => {
        const arr = [1, {a: 1}, 3, 4, 5];

        expect(set(arr, [1, 'a'], 1)).toBe(arr);
        expect(set(arr, '1.a', 1)).toBe(arr);

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};

        expect(set(obj, ['b', 'a'], 1)).toBe(obj);
        expect(set(obj, 'b.a', 1)).toBe(obj);
    });

    it('should set new value then return new entity', () => {
        const arr = [1, {a: 1}, 3, 4, 5];

        expect(set(arr, [1, 'a'], 2)).not.toBe(arr);
        expect(set(arr, '1.a', 2)).not.toBe(arr);
        expect(arr).toEqual([1, {a: 1}, 3, 4, 5]);
        expect(set(arr, '1.a', 2)).toEqual([1, {a: 2}, 3, 4, 5]);

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};

        expect(set(obj, ['b', 'a'], 2)).not.toBe(obj);
        expect(set(obj, 'b.a', 2)).not.toBe(obj);
        expect(obj).toEqual({a: 1, b: {a: 1}, c: 3, d: 4, e: 5});
        expect(set(obj, 'b.a', 2)).toEqual({a: 1, b: {a: 2}, c: 3, d: 4, e: 5});
    });
});

describe('all', () => {
    it('should not set same value then return same entity', () => {
        const arr = [1, {a: 1}, 3, 4, 5];

        expect(all(arr, [1, 'a'], 1, [2], 3)).toBe(arr);
        expect(all(arr, '1.a', 1, '2', 3)).toBe(arr);

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};

        expect(all(obj, ['b', 'a'], 1, ['c'], 3)).toBe(obj);
        expect(all(obj, 'b.a', 1, 'c', 3)).toBe(obj);
    });

    it('should set new value then return new entity', () => {
        const arr = [1, {a: 1}, 3, 4, 5];

        expect(all(arr, [1, 'a'], 2, [2], 4)).not.toBe(arr);
        expect(all(arr, '1.a', 2, '2', 4)).not.toBe(arr);
        expect(arr).toEqual([1, {a: 1}, 3, 4, 5]);
        expect(all(arr, [1, 'a'], 2, [2], 4)).toEqual([1, {a: 2}, 4, 4, 5]);

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};

        expect(all(obj, ['b', 'a'], 2, ['c'], 4)).not.toBe(obj);
        expect(all(obj, 'b.a', 2, 'c', 4)).not.toBe(obj);
        expect(obj).toEqual({a: 1, b: {a: 1}, c: 3, d: 4, e: 5});
        expect(all(obj, ['b', 'a'], 2, ['c'], 4)).toEqual({a: 1, b: {a: 2}, c: 4, d: 4, e: 5});
    });
});

describe('setPatch', () => {
    it('should generate patch on same value then return empty patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = setPatch(arr, [1, 'a'], 1);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({});

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};
        const ob2 = setPatch(obj, ['b', 'a'], 1);

        expect(obj).toEqual({a: 1, b: {a: 1}, c: 3, d: 4, e: 5});
        expect(ob2).toEqual({});
    });

    it('should generate patch on new value then return patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = setPatch(arr, [1, 'a'], 2);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({'1': {a: 2, b: 2}});

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};
        const ob2 = setPatch(obj, ['b', 'a'], 2);

        expect(obj).toEqual({a: 1, b: {a: 1}, c: 3, d: 4, e: 5});
        expect(ob2).toEqual({b: {a: 2}});
    });
});

describe('allPatch', () => {
    it('should generate patch on same values then return empty patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = allPatch(arr, [1, 'a'], 1, [2], 3);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({});

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};
        const ob2 = allPatch(obj, ['b', 'a'], 1, ['c'], 3);

        expect(obj).toEqual({a: 1, b: {a: 1}, c: 3, d: 4, e: 5});
        expect(ob2).toEqual({});
    });

    it('should generate patch on new values then return patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = allPatch(arr, [1, 'a'], 1, [2], 3);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({});

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};
        const ob2 = allPatch(obj, ['b', 'a'], 2, ['c'], 4);

        expect(obj).toEqual({a: 1, b: {a: 1}, c: 3, d: 4, e: 5});
        expect(ob2).toEqual({b: {a: 2}, c: 4});
    });
});

describe('allPatchCompare', () => {
    it('should generate patch on same values then return empty patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = allPatchCompare(arr, [1, arr[1], 3, 4, 5]);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({});

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};
        const ob2 = allPatchCompare(obj, {a: 1, b: obj.b, c: 3, d: 4, e: 5});

        expect(obj).toEqual({a: 1, b: {a: 1}, c: 3, d: 4, e: 5});
        expect(ob2).toEqual({});
    });

    it('should generate patch on new values then return patch', () => {
        const arr = [1, {a: 1, b: 2}, 3, 4, 5];
        const ar2 = allPatchCompare(arr, [1, {a: 1, b: 2}, 3, 5, 5]);

        expect(arr).toEqual([1, {a: 1, b: 2}, 3, 4, 5]);
        expect(ar2).toEqual({'1': {a: 1, b: 2}, '3': 5});

        const obj = {a: 1, b: {a: 1}, c: 3, d: 4, e: 5};
        const ob2 = allPatchCompare(obj, {a: 1, b: {a: 1}, c: 3, d: 5, e: 5});

        expect(obj).toEqual({a: 1, b: {a: 1}, c: 3, d: 4, e: 5});
        expect(ob2).toEqual({b: {a: 1}, d: 5});
    });
});
