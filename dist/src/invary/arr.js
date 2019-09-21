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
var lib_1 = require("../lib");
var lib_2 = require("../lib");
exports.Arr = function (value) {
    return new ArrInvary(value);
};
var specialized = lib_2.specialize(lib_1.arrCopySingle);
exports.arrSet = specialized.set;
exports.arrSetPatch = specialized.setPatch;
exports.arrAll = specialized.all;
exports.arrAllPatch = specialized.allPatch;
var mutables = new Array(32);
var mutableCurrent = false;
var mutableIndex = 0;
// const ArrInvaryProto = function () {};
//
// ArrInvaryProto.prototype = Array.prototype;
var specializedArrInvary = lib_2.specializeArr(function () {
    if (mutableCurrent === true) {
        mutableCurrent = new ArrInvary(this);
        return mutableCurrent;
    }
    return mutableCurrent || new ArrInvary(this);
});
var specializedArrInvaryCommon = lib_2.specialize(function () {
    if (mutableCurrent === true) {
        mutableCurrent = new ArrInvary(this);
        return mutableCurrent;
    }
    return mutableCurrent || new ArrInvary(this);
});
var superCall = false;
var ArrInvary = /** @class */ (function (_super) {
    __extends(ArrInvary, _super);
    function ArrInvary(arr) {
        var _this = this;
        // skip calling of superclass to bypass assigning of Array.constructor return value having Array type to "this":
        // _this = _super.call(this) <-- Array instance will be returned
        // see js version for more details
        if (superCall) {
            _this = _super.call(this) || this;
        }
        if (arr) {
            lib_1.arrAssignArrayLikeSingle(_this, arr);
        }
        return _this;
    }
    ArrInvary.prototype.all = function (a, b, c, d, e, f, g, h) { return this; };
    ;
    ArrInvary.prototype.get = function (key, defaultValue) { return null; };
    ;
    ArrInvary.prototype.set = function (key, val) { return this; };
    ;
    ArrInvary.prototype.batch = function (callback) { return this; };
    ;
    //public concat(...items: ReadonlyArray<T>[]): this { return this; };
    ArrInvary.prototype.deleteIndex = function (start, count) { return this; };
    ;
    //public fill(value: number, start?: number, end?: number): this { return this; };
    //public filter<S extends T>(fn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[] { return []; };
    ArrInvary.prototype.freeze = function () {
        return lib_1.arrObjFreeze(this);
    };
    ;
    ArrInvary.prototype.insertIndex = function (start, a, b, c, d, e, f, g, h) { return this; };
    ;
    ArrInvary.prototype.isArr = function (val) { return true; };
    ;
    ArrInvary.prototype.pop = function () { return [this, void 0]; };
    ;
    ArrInvary.prototype.push = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return [this, 0];
    };
    ;
    ArrInvary.prototype.slice = function (begin, end) { return this; };
    ;
    ArrInvary.prototype.shift = function () { return [this, void 0]; };
    ;
    ArrInvary.prototype.sort = function (fn) { return this; };
    ;
    ArrInvary.prototype.splice = function (start, deleteCount) {
        var elements = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            elements[_i - 2] = arguments[_i];
        }
        return [this, []];
    };
    ;
    ArrInvary.prototype.toJSON = function () { return {}; };
    ;
    ArrInvary.prototype.unshift = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return [this, 0];
    };
    ;
    return ArrInvary;
}(Array));
exports.ArrInvary = ArrInvary;
lib_1.objAssignSingle(ArrInvary.prototype, {
    get: lib_1.anyGetInContext,
    set: specializedArrInvaryCommon.setInContext,
    all: specializedArrInvaryCommon.allInContext,
    batch: function (callback) {
        mutables[++mutableIndex] = mutableCurrent;
        mutableCurrent = true;
        var result = callback(this);
        mutableCurrent = mutables[--mutableIndex];
        return result;
    },
    deleteIndex: specializedArrInvary.deleteIndexInContext,
    deleteIndex1: function (start, count) {
        if (start !== void 0 && start < this.length && start > -1) {
            var countToDelete = count || 1;
            if (mutableCurrent) {
                var i_1, l_1;
                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this);
                }
                mutableCurrent[start] = null;
                for (i_1 = start, l_1 = this.length - countToDelete; i_1 < l_1; i_1++) {
                    mutableCurrent[i_1] = mutableCurrent[i_1 + countToDelete];
                }
                for (i_1 = 0; i_1 < countToDelete; i_1++) {
                    Array.prototype.pop.call(mutableCurrent);
                }
                return mutableCurrent;
            }
            var copy = new ArrInvary(this), i = void 0, l = void 0;
            for (i = start, l = this.length - countToDelete; i < l; i++) {
                copy[i] = copy[i + countToDelete];
            }
            for (i = 0; i < countToDelete; i++) {
                Array.prototype.pop.call(copy);
            }
            return copy;
        }
        return this;
    },
    // freeze: function() {
    //     return arrObjFreeze(this);
    // },
    insertIndex: specializedArrInvary.insertIndexInContext,
    insertIndex1: function (start, a, b, c, d, e, f, g, h) {
        if (start !== void 0 && start < this.length && start > -1) {
            var countToInsert = arguments.length - 1;
            if (mutableCurrent) {
                var i_2, l_2;
                if (mutableCurrent === true) {
                    mutableCurrent = new ArrInvary(this);
                }
                for (i_2 = 0; i_2 < countToInsert; i_2++) {
                    Array.prototype.push.call(mutableCurrent, null);
                }
                for (i_2 = this.length - 1, l_2 = start; i_2 >= l_2; i_2--) {
                    mutableCurrent[i_2 + countToInsert] = mutableCurrent[i_2];
                }
                for (i_2 = 0; i_2 < countToInsert; i_2++) {
                    mutableCurrent[start + i_2] = arguments[i_2 + 1];
                }
                return mutableCurrent;
            }
            var copy = new ArrInvary(this), i = void 0, l = void 0;
            for (i = 0; i < countToInsert; i++) {
                Array.prototype.push.call(copy, null);
            }
            for (i = this.length - 1, l = start; i >= l; i--) {
                copy[i + countToInsert] = copy[i];
            }
            for (i = 0; i < countToInsert; i++) {
                copy[start + i] = arguments[i + 1];
            }
            return copy;
        }
        return this;
    },
    isArr: function (val) { return val instanceof ArrInvary; },
    pop: specializedArrInvary.popInContext,
    pop1: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }
            return [mutableCurrent, Array.prototype.pop.apply(mutableCurrent)];
        }
        var copy = new ArrInvary(this);
        var result = Array.prototype.pop.apply(copy);
        return [copy, result];
    },
    push: function (a, b, c, d, e, f, g, h) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }
            return [mutableCurrent, Array.prototype.push.apply(mutableCurrent, arguments)];
        }
        var copy = new ArrInvary(this);
        var result = Array.prototype.push.apply(copy, arguments);
        return [copy, result];
    },
    slice: function (begin, end) {
        return new ArrInvary(Array.prototype.slice.call(this, begin, end));
    },
    shift: function () {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }
            return [mutableCurrent, Array.prototype.shift.apply(mutableCurrent)];
        }
        var copy = new ArrInvary(this);
        var result = Array.prototype.shift.apply(copy);
        return [copy, result];
    },
    splice: function (start, deleteCount, a, b, c, d, e, f, g, h) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }
            return [mutableCurrent, Array.prototype.splice.apply(mutableCurrent, arguments)];
        }
        var copy = new ArrInvary(this);
        var result = Array.prototype.splice.apply(copy, arguments);
        return [copy, result];
    },
    toJSON: function () {
        return Array.prototype.constructor.apply(this, this);
    },
    unshift: function (a, b, c, d, e, f, g, h) {
        if (mutableCurrent) {
            if (mutableCurrent === true) {
                mutableCurrent = new ArrInvary(this);
            }
            return [mutableCurrent, Array.prototype.unshift.apply(mutableCurrent, arguments)];
        }
        var copy = new ArrInvary(this);
        var result = Array.prototype.unshift.apply(copy, arguments);
        return [copy, result];
    },
});
exports.isArr = ArrInvary.prototype.isArr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ludmFyeS9hcnIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsOEJBT2dCO0FBU2hCLDhCQUFpRDtBQUVwQyxRQUFBLEdBQUcsR0FBRyxVQUFZLEtBQVU7SUFDckMsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFJLEtBQUssQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUVGLElBQU0sV0FBVyxHQUFHLGdCQUFVLENBQUMsbUJBQWEsQ0FBQyxDQUFDO0FBRWpDLFFBQUEsTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7QUFDekIsUUFBQSxXQUFXLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztBQUNuQyxRQUFBLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0FBQ3pCLFFBQUEsV0FBVyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7QUFFaEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0IsSUFBSSxjQUFjLEdBQVEsS0FBSyxDQUFDO0FBQ2hDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQix5Q0FBeUM7QUFDekMsRUFBRTtBQUNGLDhDQUE4QztBQUU5QyxJQUFNLG9CQUFvQixHQUFHLG1CQUFhLENBQUM7SUFDdkMsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUIsY0FBYyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJDLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxjQUFjLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDLENBQUM7QUFDSCxJQUFNLDBCQUEwQixHQUFHLGdCQUFVLENBQUM7SUFDMUMsRUFBRSxDQUFDLENBQUMsY0FB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