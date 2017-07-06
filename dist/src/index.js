(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./lib", "./compromise/arr", "./compromise/obj"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lib_1 = require("./lib");
    var arr_1 = require("./compromise/arr");
    var obj_1 = require("./compromise/obj");
    exports.get = function (ctx, key, def) {
        return lib_1.anyGetInContext.call(ctx, key, def);
    };
    exports.set = function (ctx, key, val) {
        return ctx instanceof Array ? arr_1.arrSetInContext.call(ctx, key, val) : obj_1.objSetInContext.call(ctx, key, val);
    };
    exports.all = function (ctx) {
        return ctx instanceof Array ? arr_1.arrAll.apply(null, arguments) : obj_1.objAll.apply(null, arguments);
    };
    exports.getPatch = function (ctx, key, def) {
        return lib_1.anyGetInContext.call(ctx, key, def);
    };
    exports.setPatch = function (ctx, key, val) {
        return obj_1.objSetInContextPatch.call(ctx, key, val);
    };
    exports.allPatch = function (ctx) {
        return obj_1.objAllPatch.apply(null, arguments);
    };
});
