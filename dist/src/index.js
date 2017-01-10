(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./compromise/arr", "./compromise/obj"], factory);
    }
})(function (require, exports) {
    var arr = require("./compromise/arr");
    var obj = require("./compromise/obj");
    exports.Arr = arr.Arr;
    exports.Obj = obj.Obj;
    exports.isArr = arr.isArr;
    exports.isObj = obj.isObj;
});
