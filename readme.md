# Compomise

A small library of simple immutable data structures like Array and Object. For big data structures using of [immutable.js](https://github.com/facebook/immutable-js/) will be a better way.

## Global methods

*Get* - gets value by path like 'a.b.c'.

Returns default value if the path doesn't exists.

```javascript
let obj = {
    a: {
        b: 1
    },
    c: 2
}

get(obj, 'a.b', 3); // {b: 1}

get(obj, 'b', 3); // 3
```

*Set* - sets value by path like 'a.b.c'.

Returns the copy of the initial data if new value differs from old value.

```javascript
let obj = {
    a: {
        b: 1
    },
    c: 2
}

obj === get(obj, 'a.b', 1); // true

obj === set(obj, 'a.b', 2); // false, result of operation = {a: {b: 2}, c: 2} 
```

*All* - sets multiple values by paths like 'a.b.c'.

Returns the copy of the initial data if any new value differs from old value.

```javascript
let obj = {
    a: {
        b: 1
    },
    c: 2
}

obj === all(obj, 'a.b', 1, 'c', 2); // true

obj === set(obj, 'a.b', 2, 'c', 3); // false, result of operation = {a: {b: 2}, c: 3} 
```

## Arr, Obj

Initialize immutable Array of Object:

```javascript
let arr = Arr([1, 2]);
```

```javascript
let obj = Obj({a: 1});
```

Structures provide the methods with same behavior as the *get*, *set* and *all* described above:

```javascript
let obj = Obj({a: 1});

obj.get('b', 2); // 2
```

```javascript
let obj = Obj({a: 1});

obj.set('b', 2); // new Obj = {a: 1, b: 2}
```

```javascript
let obj = Obj({a: 1});

obj.all('a': 2, 'b', 2); // new Obj = {a: 2, b: 2}
```

## Benchmarks

```
------------------------------
objAssignSingle of object with 10 keys

Total ops.: 1000000
Time spent: 391 ms
Ops. per second: 2557544.757033248
Time per single op.: 0.000391 ms

------------------------------
Object.assign of object with 10 keys

Total ops.: 1000000
Time spent: 1634 ms
Ops. per second: 611995.1040391676
Time per single op.: 0.001634 ms

==============================
317.9028132992327% faster
==============================

------------------------------
objAssign of 2 objects each one with 10 keys

Total ops.: 1000000
Time spent: 1838 ms
Ops. per second: 544069.640914037
Time per single op.: 0.001838 ms

------------------------------
Object.assign of 2 objects each one with 10 keys

Total ops.: 1000000
Time spent: 4532 ms
Ops. per second: 220653.1332744925
Time per single op.: 0.004532 ms

==============================
146.57236126224154% faster
==============================

------------------------------
arrMerge of array with 10 elements

Total ops.: 1000000
Time spent: 59 ms
Ops. per second: 16949152.542372882
Time per single op.: 0.000059 ms

------------------------------
Array.concat with array with 10 elements

Total ops.: 1000000
Time spent: 144 ms
Ops. per second: 6944444.444444445
Time per single op.: 0.000144 ms

==============================
144.0677966101695% faster
==============================

------------------------------
arrMerge of 2 arrays each one with 10 elements

Total ops.: 1000000
Time spent: 112 ms
Ops. per second: 8928571.42857143
Time per single op.: 0.000112 ms

------------------------------
Array.concat with 2 arrays each one with 10 elements

Total ops.: 1000000
Time spent: 173 ms
Ops. per second: 5780346.820809249
Time per single op.: 0.000173 ms

==============================
54.46428571428572% faster
==============================
```