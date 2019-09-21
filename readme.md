# Invary

A small library of simple immutable data structures such as Array and Object.

The main goal of this library is to provide immutable data structures which principle of use is similar to classic JS Array and Object.
This may be useful and convenient in case of small objects having up to 20 properties.
For big data structures, using of [Immutable.js](https://github.com/facebook/immutable-js/) will be a better way.

## Installation

```sh
$ npm install invary
```

## Running tests

```sh
$ npm test
```

## Global methods

*get(context, path, default value)* - gets value by path like 'a.b.c' or ['a', 'b', 'c'].

Returns the default value, if the path doesn't exist.

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

Returns the copy of the initial data if the new value differs from old value.

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

* **deleteIndex(start, count=1)** - deletes number of elements in the provided position, returns copy
* **insertIndex(start, ...values)** - inserts values in the provided position, returns copy
* **pop()** - like Array.pop, returns [copy, popped element]
* **push(value)** - like Array.push, returns [copy, new length]
* **shift()** - like Array.shift, returns [copy, shifted element]
* **slice(begin, end)** - like Array.slice, returns new ArrInvary
* **splice(start, deleteCount, ...values)** - like Array.splice, returns [copy, array of deleted elements]
* **unshift()** - like Array.unshift, returns [copy, new length]

## RecInvary

RecInvary is a record with default properties which will be used as default values if some property is not set yet to a custom value.
RecInvary class (not instance) must be constructed with Rec factory.

```javascript
let cls = Rec({a: 1, b: 2, c: 3}); // constructs RecInvary class with default properties "a", "b" and "c" in the prototype
let record = new cls(); // new RecInvary()

record.a; // 1

record.get('a'); // 1

record = record.set('a', 2); // new RecInvary({a: 2});

record.get('a'); // 2

record = record.set('x', 2); // throws Error('Key was not defined in props: x')
```

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

In the development mode all Invary entities will be frozen to avoid errors during development process. To activate development mode set env variable NODE_ENV=dev or set window.INVARY_ENV=dev.

## Benchmarks (Intel Core i7, 4 cores, disabled HT, 16gb 1600mhz DDR3, NodeJS 6.12.0)

Test data:

```js
Arr([
    0,
    {
        b0: 1,
        b1: {
            b10: 1,
            b11: {
                b110: 1,
                b111: 2
            }
        }
    },
    2, 3, 4, 5, 6, 7, 8, 9
]);
```

```js
Obj({
    a: 0,
    b: {
        b0: 1,
        b1: {
            b10: 1,
            b11: {
                b110: 1,
                b111: 2
            }
        }
    },
    c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9
});
```

```
------------------------------
Arr (path - 0) get existing index

Total ops.: 10000000
Time spent: 601 ms
Ops. per second: 16638935.108153079
Time per single op.: 0.0000601 ms

------------------------------
Arr (path - 1.b1.b11.b111) get existing index

Total ops.: 10000000
Time spent: 838 ms
Ops. per second: 11933174.224343674
Time per single op.: 0.0000838 ms

------------------------------
Arr (path - 0) set existing index with same value

Total ops.: 10000000
Time spent: 658 ms
Ops. per second: 15197568.389057752
Time per single op.: 0.0000658 ms

------------------------------
Arr (path - 1.b1.b11.b111) set existing index with same value

Total ops.: 10000000
Time spent: 893 ms
Ops. per second: 11198208.286674133
Time per single op.: 0.0000893 ms

------------------------------
Arr (path - 0, 10 props to be copied) set existing index with new value

Total ops.: 10000000
Time spent: 4888 ms
Ops. per second: 2045826.5139116202
Time per single op.: 0.0004888 ms

------------------------------
Arr (path - 1.b1.b11.b111, 14 props to be copied) set existing index with new value

Total ops.: 10000000
Time spent: 10305 ms
Ops. per second: 970402.7171276079
Time per single op.: 0.0010305 ms

------------------------------
Obj (path - a) get existing key

Total ops.: 10000000
Time spent: 554 ms
Ops. per second: 18050541.516245488
Time per single op.: 0.0000554 ms

------------------------------
Obj (path - b.b1.b11.b111) get existing key

Total ops.: 10000000
Time spent: 939 ms
Ops. per second: 10649627.263045793
Time per single op.: 0.0000939 ms

------------------------------
Obj (path - a) set existing key with same value

Total ops.: 10000000
Time spent: 534 ms
Ops. per second: 18726591.760299623
Time per single op.: 0.0000534 ms

------------------------------
Obj (path - b.b1.b11.b111) set existing key with same value

Total ops.: 10000000
Time spent: 902 ms
Ops. per second: 11086474.501108648
Time per single op.: 0.0000902 ms

------------------------------
Obj (path - a, 10 props to be copied) set existing key with new value

Total ops.: 10000000
Time spent: 3066 ms
Ops. per second: 3261578.6040443573
Time per single op.: 0.0003066 ms

------------------------------
Obj (path - b.b1.b11.b111, 14 props to be copied) set existing key with new value

Total ops.: 10000000
Time spent: 8040 ms
Ops. per second: 1243781.0945273633
Time per single op.: 0.000804 ms
```