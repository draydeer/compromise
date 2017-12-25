import {
    arrMerge,
    arrAssignArrayLike,
    arrAssignArrayLikeSingle,
    objAssign,
    objAssignSingle
} from "../src/lib";
import {
    Arr
} from "../src";
import {
    Obj
} from "../src";

let time, timeSpentNew, timeSpentOld;

function percent() {
    console.log('==============================');

    if (timeSpentOld < timeSpentNew) {
        console.log((timeSpentNew / timeSpentOld * 100 - 100) + '% faster');
    } else {
        console.log((timeSpentOld / timeSpentNew * 100 - 100) + '% slower');
    }

    console.log('==============================');
    console.log();
}

function start() {
    time = new Date().getTime();
}

function stop(title, ops) {
    timeSpentOld = timeSpentNew;

    timeSpentNew = new Date().getTime() - time;

    console.log('------------------------------');
    console.info(title);
    console.log();
    console.log('Total ops.: ' + ops);
    console.log('Time spent: ' + timeSpentNew + ' ms');
    console.log('Ops. per second: ' + (1000 / timeSpentNew * ops));
    console.log('Time per single op.: ' + (timeSpentNew / ops) + ' ms');
    console.log();
}



let a = Obj({a: 0, b: {b0: 1, b1: {b10: 1, b11: {b110: 1, b111: 2}}}, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9});
let b = Arr([0, {b0: 1, b1: {b10: 1, b11: {b110: 1, b111: 2}}}, 2, 3, 4, 5, 6, 7, 8, 9]);
let arrKey1 = [0];
let arrKey2 = [1, 'b1', 'b11', 'b111'];
let objKey1 = ['a'];
let objKey2 = ['b', 'b1', 'b11', 'b111'];


// Arr (path - 0) get existing index
start();

for (let i = 0; i < 10000000; i ++) {
    b.get([0]);
}

stop('Arr (path - 0) get existing index', 10000000);

// Arr (path - 1.b1.b11.b111) get existing index
start();

for (let i = 0; i < 10000000; i ++) {
    b.get([1, 'b1', 'b11', 'b111']);
}

stop('Arr (path - 1.b1.b11.b111) get existing index', 10000000);

// Arr (path - 0) set existing index with same value
start();

for (let i = 0; i < 10000000; i ++) {
    b.set([0], 0);
}

stop('Arr (path - 0) set existing index with same value', 10000000);

// Arr (path - 1.b1.b11.b111) set existing index with same value
start();

for (let i = 0; i < 10000000; i ++) {
    b.set([1, 'b1', 'b11', 'b111'], 2);
}

stop('Arr (path - 1.b1.b11.b111) set existing index with same value', 10000000);

// Arr (path - 0, 10 props to be copied) set existing index with new value
start();

for (let i = 0; i < 10000000; i ++) {
    b.set([0], 1);
}

stop('Arr (path - 0, 10 props to be copied) set existing index with new value', 10000000);

// Arr (path - 1.b1.b11.b111, 14 props to be copied) set existing index with new value
start();

for (let i = 0; i < 10000000; i ++) {
    b.set([1, 'b1', 'b11', 'b111'], 3);
}

stop('Arr (path - 1.b1.b11.b111, 14 props to be copied) set existing index with new value', 10000000);


// Obj (path - a) get existing key
start();

for (let i = 0; i < 10000000; i ++) {
    a.get(['a']);
}

stop('Obj (path - a) get existing key', 10000000);

// Obj (path - b.b1.b11.b111) get existing key
start();

for (let i = 0; i < 10000000; i ++) {
    a.get(['b', 'b1', 'b11', 'b111']);
}

stop('Obj (path - b.b1.b11.b111) get existing key', 10000000);

// Obj (path - a) set existing key with same value
start();

for (let i = 0; i < 10000000; i ++) {
    a.set(['a'], 0);
}

stop('Obj (path - a) set existing key with same value', 10000000);

// Obj (path - b.b1.b11.b111) set existing key with same value
start();

for (let i = 0; i < 10000000; i ++) {
    a.set(['b', 'b1', 'b11', 'b111'], 2);
}

stop('Obj (path - b.b1.b11.b111) set existing key with same value', 10000000);

// Obj (path - a, 10 props to be copied) set existing key with new value
start();

for (let i = 0; i < 10000000; i ++) {
    a.set(['a'], 1);
}

stop('Obj (path - a, 10 props to be copied) set existing key with new value', 10000000);

// Obj (path - b.b1.b11.b111, 14 props to be copied) set existing key with new value
start();

for (let i = 0; i < 10000000; i ++) {
    a.set(['b', 'b1', 'b11', 'b111'], 3);
}

stop('Obj (path - b.b1.b11.b111, 14 props to be copied) set existing key with new value', 10000000);
