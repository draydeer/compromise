# Compromise

A small library of simple immutable data structures like Array and Object. For big data structures using of [immutable.js](https://github.com/facebook/immutable-js/) will be a better way.

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

get(obj, 'b', 3); // 3
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

obj === set(obj, 'a.b', 2); // false, result of operation = {a: {b: 2}, c: 2} 
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

setPatch(obj, 'a.b', 2); // {a: {b: 2}} 
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

obj === all(obj, 'a.b', 2, 'c', 3); // false, result of operation = {a: {b: 2}, c: 3} 
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

allPatch(obj, 'a.b', 2, 'c', 3); // {a: {b: 2}, c: 3} 
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

## Arr and Obj commons

Initialize immutable Array or Object:

```javascript
let arr = Arr([1, 2]);
```

```javascript
let obj = Obj({a: 1});
```

Structures provide methods with the same behavior, as well as the methods (*get*, *set* and *all*) described above:

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

obj.all('a', 2, 'b', 2); // new Obj = {a: 2, b: 2}
```

## Arr

Arr provides immutable analogs of the common Array methods.

The result of calling of these methods is a tuple with the reference to the new Arr and the result of operation.

```javascript
let arr = Arr([0, 1, 2]);

arr = arr.pop(); // [new Arr([0, 1]), 2]
```

Methods:

* **deleteIndex** - deletes the provided position
* **insertIndex** - inserts value in the provided position
* **pop** - like Array.pop 
* **push** - like Array.push 
* **shift** - like Array.shift
* **unshift** - like Array.unshift

## Bulk mode

To increase performance of the immutable operations these operations can be performed in *bulk* context:

```javascript
arr = Arr([1, 2, 3]);

arr = arr.bulk((mutable) {
    mutable.set([0], 2);
    mutable.set([1], 3);
    mutable.push(6);
    
    return mutable;
});
```

## Benchmarks

```
------------------------------
Arr (10 elements, depth 0) get existing index

Total ops.: 10000000
Time spent: 525 ms
Ops. per second: 19047619.047619045
Time per single op.: 0.0000525 ms

------------------------------
Arr (10 elements, depth 4) get existing index

Total ops.: 10000000
Time spent: 956 ms
Ops. per second: 10460251.046025105
Time per single op.: 0.0000956 ms

------------------------------
Arr (10 elements, depth 0) set existing index with same value

Total ops.: 10000000
Time spent: 597 ms
Ops. per second: 16750418.760469012
Time per single op.: 0.0000597 ms

------------------------------
Arr (10 elements, depth 4) set existing index with same value

Total ops.: 10000000
Time spent: 1010 ms
Ops. per second: 9900990.099009901
Time per single op.: 0.000101 ms

------------------------------
Arr (10 elements, depth 0) set existing index with new value

Total ops.: 10000000
Time spent: 5514 ms
Ops. per second: 1813565.4697134567
Time per single op.: 0.0005514 ms

------------------------------
Arr (10 elements, depth 4) set existing index with new value

Total ops.: 10000000
Time spent: 17529 ms
Ops. per second: 570483.1992697815
Time per single op.: 0.0017529 ms

------------------------------
Obj (10 props, depth 0) get existing key

Total ops.: 10000000
Time spent: 795 ms
Ops. per second: 12578616.352201257
Time per single op.: 0.0000795 ms

------------------------------
Obj (10 props, depth 4) get existing key

Total ops.: 10000000
Time spent: 1011 ms
Ops. per second: 9891196.834817013
Time per single op.: 0.0001011 ms

------------------------------
Obj (10 props, depth 0) set existing key with same value

Total ops.: 10000000
Time spent: 794 ms
Ops. per second: 12594458.438287152
Time per single op.: 0.0000794 ms

------------------------------
Obj (10 props, depth 4) set existing key with same value

Total ops.: 10000000
Time spent: 1027 ms
Ops. per second: 9737098.34469328
Time per single op.: 0.0001027 ms

------------------------------
Obj (10 props, depth 0) set existing key with new value

Total ops.: 10000000
Time spent: 4759 ms
Ops. per second: 2101281.781886951
Time per single op.: 0.0004759 ms

------------------------------
Obj (10 props, depth 4) set existing key with new value

Total ops.: 10000000
Time spent: 15703 ms
Ops. per second: 636820.9896198179
Time per single op.: 0.0015703 ms
```