"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("../src/lib");
var time, timeSpentNew, timeSpentOld;
function percent() {
    console.log('==============================');
    if (timeSpentOld < timeSpentNew) {
        console.log((timeSpentNew / timeSpentOld * 100 - 100) + '% faster');
    }
    else {
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
var a = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9 };
var b = { k: 9, l: 9, m: 9, n: 9, o: 9, p: 9, q: 9, r: 9, s: 9, t: 9 };
var c = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// objAssignSingle / Object.assign
start();
for (var i = 0; i < 1000000; i++) {
    lib_1.objAssignSingle({}, a);
}
stop('objAssignSingle of object with 10 keys', 1000000);
start();
for (var i = 0; i < 1000000; i++) {
    Object.assign({}, a);
}
stop('Object.assign of object with 10 keys', 1000000);
percent();
// objAssign / Object.assign
start();
for (var i = 0; i < 1000000; i++) {
    lib_1.objAssign({}, a, b);
}
stop('objAssign of 2 objects each one with 10 keys', 1000000);
start();
for (var i = 0; i < 1000000; i++) {
    Object.assign({}, a, b);
}
stop('Object.assign of 2 objects each one with 10 keys', 1000000);
percent();
// arrMerge / Array.concat
start();
for (var i = 0; i < 1000000; i++) {
    lib_1.arrMerge(c);
}
stop('arrMerge of array with 10 elements', 1000000);
start();
for (var i = 0; i < 1000000; i++) {
    [].concat(c);
}
stop('Array.concat with array with 10 elements', 1000000);
percent();
// arrMerge / Array.concat
start();
for (var i = 0; i < 1000000; i++) {
    lib_1.arrMerge(c, c);
}
stop('arrMerge of 2 arrays each one with 10 elements', 1000000);
start();
for (var i = 0; i < 1000000; i++) {
    [].concat(c, c);
}
stop('Array.concat with 2 arrays each one with 10 elements', 1000000);
percent();
