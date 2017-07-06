import {
    arrFastCombine,
    arrFastCopyArrayLike,
    arrFastCopyArrayLikeSingle,
    objFastCopy,
    objFastCopySingle
} from "../src/lib";

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
    console.log('Total ops.: ' + ops);
    console.log('Time spent: ' + timeSpentNew + ' ms');
    console.log('Ops. per second: ' + (1000 / timeSpentNew * ops));
    console.log('Time per single op.: ' + (timeSpentNew / ops));
    console.log();
}


let a = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9};
let b = {k: 9, l: 9, m: 9, n: 9, o: 9, p: 9, q: 9, r: 9, s: 9, t: 9};
let c = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// objFastCopySingle / Object.assign
start();

for (let i = 0; i < 1000000; i ++) {
    objFastCopySingle({}, a);
}

stop('objFastCopySingle of object with 10 keys', 1000000);

start();

for (let i = 0; i < 1000000; i ++) {
    Object.assign({}, a);
}

stop('Object.assign of object with 10 keys', 1000000);

percent();

// objFastCopy / Object.assign
start();

for (let i = 0; i < 1000000; i ++) {
    objFastCopy({}, a, b);
}

stop('objFastCopy of 2 objects each one with 10 keys', 1000000);

start();

for (let i = 0; i < 1000000; i ++) {
    Object.assign({}, a, b);
}

stop('Object.assign of 2 objects each one with 10 keys', 1000000);

percent();

// arrFastCombine / Array.concat
start();

for (let i = 0; i < 1000000; i ++) {
    arrFastCombine(c);
}

stop('arrFastCombine of array with 10 elements', 1000000);

start();

for (let i = 0; i < 1000000; i ++) {
    [].concat(c);
}

stop('Array.concat with array with 10 elements', 1000000);

percent();

// arrFastCombine / Array.concat
start();

for (let i = 0; i < 1000000; i ++) {
    arrFastCombine(c, c);
}

stop('arrFastCombine of 2 arrays each one with 10 elements', 1000000);

start();

for (let i = 0; i < 1000000; i ++) {
    [].concat(c, c);
}

stop('Array.concat with 2 arrays each one with 10 elements', 1000000);

percent();
