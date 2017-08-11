# Invary

A small library of simple immutable data structures like Array and Object.

The main goal of this library is to provide immutable data structures which principle of use is similar to Array and Object.
This may be useful and convenient in case of small objects having 10-20 properties.
For big data structures using of [Immutable.js](https://github.com/facebook/immutable-js/) will be a better way.

## Installation

```sh
$ npm install invary
```

## Running tests

```sh
$ npm test
```

## Global methods

*get* - gets value by path like 'a.b.c' or ['a', 'b', 'c'].

Returns default value if the path doesn't exists.

```javascript
let obj = {
    a: {
        b: 1
    },
    c: 2
}

get(obj, 'a.b', 3); // {b: 1}

get(obj, ['b'], 3); // 3
```

*set* - sets value by path like 'a.b.c' or ['a', 'b', 'c'].

Returns the copy of the initial data if new value differs from old value.

```javascript
let obj = {
    a: {
        b: 1
    },
    c: 2
}

obj === set(obj, 'a.b', 1); // true

obj === set(obj, ['a', 'b'], 2); // false, result of operation = {a: {b: 2}, c: 2} 
```

*setPatch* - generates patch (difference) which should be applied above the initial data.

Returns object with the new key if new value differs from old value.

```javascript
let obj = {
    a: {
        b: 1
    },
    c: 2
}

setPatch(obj, 'a.b', 1); // {}

setPatch(obj, ['a', 'b'], 2); // {a: {b: 2}} 
```

*all* - sets multiple values by paths like 'a.b.c' or ['a', 'b', 'c'].

Returns the copy of the initial data if any new value differs from old value.

```javascript
let obj = {
    a: {
        b: 1
    },
    c: 2
}

obj === all(obj, 'a.b', 1, 'c', 2); // true

obj === all(obj, ['a', 'b'], 2, ['c'], 3); // false, result of operation = {a: {b: 2}, c: 3} 
```

*allPatch* - generates patch (differences) checking multiple keys which should be applied above the initial data.
             
Returns object with the new keys if any new value differs from old value.

```javascript
let obj = {
    a: {
        b: 1
    },
    c: 2
}

allPatch(obj, 'a.b', 1, 'c', 2); // {}

allPatch(obj, ['a', 'b'], 2, ['c'], 3); // {a: {b: 2}, c: 3} 
```

*allPatchCompare* - generates patch (differences) checking source key in target which should be applied above the initial data.
             
Returns object with the new keys if any new value differs from old value.

```javascript
let obj = {
    a: {
        b: 1
    },
    c: 2
}

allPatchCompare(obj, {c: 2}); // {}

allPatchCompare(obj, {c: 3}); // {c: 3} 
```

## ArrInvary and ObjInvary commons

Initialize immutable Array or Object:

```javascript
let arr = Arr([1, 2]);
```

```javascript
let obj = Obj({a: 1});
```

or

```javascript
let arr = new ArrInvary([1, 2]);
```

```javascript
let obj = new ObjInvary({a: 1});
```

Structures provide methods with the same behavior, as well as the methods (*get*, *set* and *all*) described above:

```javascript
let obj = Obj({a: 1});

obj.get('b', 2); // 2
```

```javascript
let obj = Obj({a: 1});

obj.set('b', 2); // new ObjInvary({a: 1, b: 2})
```

```javascript
let obj = Obj({a: 1});

obj.all('a', 2, 'b', 2); // new ObjInvary({a: 2, b: 2})
```

## ArrInvary

ArrInvary provides immutable analogs of the common Array methods.
The result of calling some of these methods is a tuple with the reference to the new ArrInvary and the result of operation.

```javascript
let arr = Arr([0, 1, 2]);

arr = arr.pop(); // [new ArrInvary([0, 1]), 2]
```

Methods:

* **deleteIndex** - deletes the provided position, returns copy
* **insertIndex** - inserts value in the provided position, returns copy
* **pop** - like Array.pop, returns [copy, popped element]
* **push** - like Array.push, returns [copy, new length]
* **shift** - like Array.shift, returns [copy, shifted element]
* **slice** - like Array.slice, returns new ArrInvary
* **unshift** - like Array.unshift, returns [copy, new length]

## Batch

To increase performance of the immutable operations these operations can be performed in a batch on the mutable copy of data.
Operations are lazy and return the mutable copy of data only if it is necessary.
After the mutable copy of data has been created all operations will work with it.

```javascript
arr = Arr([1, 2, 3]);

arr = arr.batch((mutable) => {
    mutable = mutable.set([0], 2);
    mutable = mutable.set([1], 3);
    mutable = mutable.push(6)[0];
    
    return mutable;
});
```

Batch operations can be nested:

```javascript
arr = Arr([1, 2, 3]);

arr = arr.batch((mutable1) => {
    const ar2 = mutable1.batch((mutable2) => {
        ... do something ...
    });
    
    return mutable1;
});
```

## Development mode

In the development mode all Invary entities will be frozen to avoid bugs during development process. To activate development mode set env variable NODE_ENV=dev or set window.INVARY_ENV=dev.

## Benchmarks (Intel Core i7, 4 cores, disabled HT, 16gb 1600mhz DDR3)

Test data:

Arr([0, {b0: 1, b1: {b10: 1, b11: {b110: 1, b111: 2}}}, 2, 3, 4, 5, 6, 7, 8, 9]);

Obj({a: 0, b: {b0: 1, b1: {b10: 1, b11: {b110: 1, b111: 2}}}, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9});

```
------------------------------
ArrInvary (10 elements, depth 0) get existing index

Total ops.: 10000000
Time spent: 524 ms
Ops. per second: 19083969.465648856
Time per single op.: 0.0000524 ms

------------------------------
ArrInvary (10 elements, depth 4) get existing index

Total ops.: 10000000
Time spent: 953 ms
Ops. per second: 10493179.433368312
Time per single op.: 0.0000953 ms

------------------------------
ArrInvary (10 elements, depth 0) set existing index with same value

Total ops.: 10000000
Time spent: 596 ms
Ops. per second: 16778523.489932887
Time per single op.: 0.0000596 ms

------------------------------
ArrInvary (10 elements, depth 4) set existing index with same value

Total ops.: 10000000
Time spent: 981 ms
Ops. per second: 10193679.91845056
Time per single op.: 0.0000981 ms

------------------------------
ArrInvary (10 elements, depth 0) set existing index with new value (substitute array copying)

Total ops.: 10000000
Time spent: 5292 ms
Ops. per second: 1889644.746787604
Time per single op.: 0.0005292 ms

------------------------------
ArrInvary (10 elements, depth 4) set existing index with new value (substitute array copying)

Total ops.: 10000000
Time spent: 16730 ms
Ops. per second: 597728.6312014345
Time per single op.: 0.001673 ms

------------------------------
ObjInvary (10 props, depth 0) get existing key

Total ops.: 10000000
Time spent: 793 ms
Ops. per second: 12610340.479192939
Time per single op.: 0.0000793 ms

------------------------------
ObjInvary (10 props, depth 4) get existing key

Total ops.: 10000000
Time spent: 1026 ms
Ops. per second: 9746588.693957115
Time per single op.: 0.0001026 ms

------------------------------
ObjInvary (10 props, depth 0) set existing key with same value

Total ops.: 10000000
Time spent: 793 ms
Ops. per second: 12610340.479192939
Time per single op.: 0.0000793 ms

------------------------------
ObjInvary (10 props, depth 4) set existing key with same value

Total ops.: 10000000
Time spent: 1009 ms
Ops. per second: 9910802.775024777
Time per single op.: 0.0001009 ms

------------------------------
ObjInvary (10 props, depth 0) set existing key with new value

Total ops.: 10000000
Time spent: 4497 ms
Ops. per second: 2223704.6920169
Time per single op.: 0.0004497 ms

------------------------------
ObjInvary (10 props, depth 4) set existing key with new value

Total ops.: 10000000
Time spent: 15411 ms
Ops. per second: 648887.1585231329
Time per single op.: 0.0015411 ms
```