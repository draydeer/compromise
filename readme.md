```
------------------------------
objFastCopySingle of object with 10 keys
Total ops.: 1000000
Time spent: 401 ms
Ops. per second: 2493765.5860349126
Time per single op.: 0.000401

------------------------------
Object.assign of object with 10 keys
Total ops.: 1000000
Time spent: 1698 ms
Ops. per second: 588928.1507656066
Time per single op.: 0.001698

==============================
323.4413965087282% faster
==============================

------------------------------
objFastCopy of 2 objects each one with 10 keys
Total ops.: 1000000
Time spent: 1954 ms
Ops. per second: 511770.7267144319
Time per single op.: 0.001954

------------------------------
Object.assign of 2 objects each one with 10 keys
Total ops.: 1000000
Time spent: 4742 ms
Ops. per second: 210881.4846056516
Time per single op.: 0.004742

==============================
142.68167860798366% faster
==============================

------------------------------
arrFastCombine of array with 10 elements
Total ops.: 1000000
Time spent: 60 ms
Ops. per second: 16666666.666666668
Time per single op.: 0.00006

------------------------------
Array.concat with array with 10 elements
Total ops.: 1000000
Time spent: 148 ms
Ops. per second: 6756756.756756757
Time per single op.: 0.000148

==============================
146.66666666666669% faster
==============================

------------------------------
arrFastCombine of 2 arrays each one with 10 elements
Total ops.: 1000000
Time spent: 115 ms
Ops. per second: 8695652.173913043
Time per single op.: 0.000115

------------------------------
Array.concat with 2 arrays each one with 10 elements
Total ops.: 1000000
Time spent: 180 ms
Ops. per second: 5555555.555555555
Time per single op.: 0.00018

==============================
56.52173913043478% faster
==============================
```