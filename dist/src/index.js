"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
exports.anyGetInContext = lib_1.anyGetInContext;
var arr_1 = require("./invary/arr");
exports.Arr = arr_1.Arr;
exports.ArrInvary = arr_1.ArrInvary;
exports.arrAll = arr_1.arrAll;
exports.arrAllPatch = arr_1.arrAllPatch;
exports.arrSet = arr_1.arrSet;
exports.arrSetPatch = arr_1.arrSetPatch;
exports.isArr = arr_1.isArr;
var obj_1 = require("./invary/obj");
exports.Obj = obj_1.Obj;
exports.ObjInvary = obj_1.ObjInvary;
exports.objAll = obj_1.objAll;
exports.objAllPatch = obj_1.objAllPatch;
exports.objSet = obj_1.objSet;
exports.objSetPatch = obj_1.objSetPatch;
exports.isObj = obj_1.isObj;
var rec_1 = require("./invary/rec");
exports.Rec = rec_1.Rec;
var arr_dev_mode_1 = require("./invary/arr_dev_mode");
var obj_dev_mode_1 = require("./invary/obj_dev_mode");
var rec_dev_mode_1 = require("./invary/rec_dev_mode");
// monkey patch of dev mode
if (lib_1.Context.isDevMode) {
    exports.Arr = arr_dev_mode_1.Arr;
    exports.ArrInvary = arr_dev_mode_1.ArrInvary;
    exports.arrAll = arr_dev_mode_1.arrAll;
    exports.arrAllPatch = arr_dev_mode_1.arrAllPatch;
    exports.arrSet = arr_dev_mode_1.arrSet;
    exports.arrSetPatch = arr_dev_mode_1.arrSetPatch;
    exports.isArr = arr_dev_mode_1.isArr;
    exports.Obj = obj_dev_mode_1.Obj;
    exports.ObjInvary = obj_dev_mode_1.ObjInvary;
    exports.objAll = obj_dev_mode_1.objAll;
    exports.objAllPatch = obj_dev_mode_1.objAllPatch;
    exports.objSet = obj_dev_mode_1.objSet;
    exports.objSetPatch = obj_dev_mode_1.objSetPatch;
    exports.isObj = obj_dev_mode_1.isObj;
    exports.Rec = rec_dev_mode_1.Rec;
}
exports.get = function (target, key, def) {
    return exports.anyGetInContext.call(target, key, def);
};
exports.set = function (target, key, val) {
    return target instanceof Array ? exports.arrSet(target, key, val) : exports.objSet(target, key, val);
};
exports.all = function (target, a, b, c, d, e, f, g, h) {
    return target instanceof Array ? exports.arrAll.apply(null, arguments) : exports.objAll.apply(null, arguments);
};
exports.setPatch = function (target, key, val) {
    return exports.objSetPatch(target, key, val);
};
exports.allPatch = function (target, a, b, c, d, e, f, g, h) {
    return exports.objAllPatch.apply(null, arguments);
};
exports.allPatchCompare = function (target, source) {
    return source instanceof Array ? lib_1.arrPatchCompare(target, source) : lib_1.objPatchCompare(target, source);
};
exports.construct = function (mixed) {
    return mixed instanceof Array ? exports.Arr(mixed) : exports.Obj(mixed);
};
var isArrayOrigin = Array.isArray.bind(Array);
var isArray = function (arg) {
    return arg instanceof exports.ArrInvary || isArrayOrigin(arg);
};
exports.applyIsArrayPatch = function () {
    if (Array.isArray !== isArray) {
        Array.isArray = isArray;
    }
};
var A = /** @class */ (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A;
}(Array));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNkJBS2U7QUFnRVgsMEJBbkVBLHFCQUFlLENBbUVBO0FBcERuQixvQ0FRc0I7QUF1Q2xCLGNBOUNBLFNBQUcsQ0E4Q0E7QUFDSCxvQkE5Q0EsZUFBUyxDQThDQTtBQUtULGlCQWxEQSxZQUFNLENBa0RBO0FBQ04sc0JBbERBLGlCQUFXLENBa0RBO0FBQ1gsaUJBbERBLFlBQU0sQ0FrREE7QUFDTixzQkFsREEsaUJBQVcsQ0FrREE7QUFDWCxnQkFsREEsV0FBSyxDQWtEQTtBQS9DVCxvQ0FRc0I7QUF3Q2xCLGNBL0NBLFNBQUcsQ0ErQ0E7QUFDSCxvQkEvQ0EsZUFBUyxDQStDQTtBQUlULGlCQWxEQSxZQUFNLENBa0RBO0FBQ04sc0JBbERBLGlCQUFXLENBa0RBO0FBQ1gsaUJBbERBLFlBQU0sQ0FrREE7QUFDTixzQkFsREEsaUJBQVcsQ0FrREE7QUFDWCxnQkFsREEsV0FBSyxDQWtEQTtBQS9DVCxvQ0FBZ0M7QUFnRDVCLGNBaERJLFNBQUcsQ0FnREo7QUE5Q1Asc0RBUStCO0FBRS9CLHNEQVErQjtBQUUvQixzREFFK0I7QUEyQi9CLDJCQUEyQjtBQUMzQixFQUFFLENBQUMsQ0FBQyxhQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwQixPQUFPLENBQUMsR0FBRyxHQUFHLGtCQUFNLENBQUM7SUFDckIsT0FBTyxDQUFDLFNBQVMsR0FBRyx3QkFBWSxDQUFDO0lBQ2pDLE9BQU8sQ0FBQyxNQUFNLEdBQUcscUJBQVMsQ0FBQztJQUMzQixPQUFPLENBQUMsV0FBVyxHQUFHLDBCQUFjLENBQUM7SUFDckMsT0FBTyxDQUFDLE1BQU0sR0FBRyxxQkFBUyxDQUFDO0lBQzNCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsMEJBQWMsQ0FBQztJQUNyQyxPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFR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