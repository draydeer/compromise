"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rec_1 = require("../src/invary/rec");
var rec_dev_mode_1 = require("../src/invary/rec_dev_mode");
var data = { a: 1, b: 2, c: 3 };
function test(Rec) {
    describe('RecInvary', function () {
        it('should create RecInvary class', function () {
            var cls = Rec(data);
            expect(cls instanceof Function).toBeTruthy();
        });
        it('should create instance of rec class', function () {
            var cls = Rec(data);
            expect(new cls() instanceof cls).toBeTruthy();
        });
        it('should get RecInvary class default value by existing path', function () {
            var cls = Rec(data);
            expect(new cls().a).toBe(data.a);
        });
        it('should throw on set of unknown property', function () {
            var cls = Rec(data);
            function x() {
                new cls().set('d.e.f', 4);
            }
            expect(x).toThrow();
        });
        it('should not set same value by existing path then return same instance of RecInvary class', function () {
            var cls = Rec(data);
            var rec = new cls();
            var re2 = rec.set("a", data.a);
            expect(re2).toBe(rec);
        });
        it('should set new value by existing path then return new instance of RecInvary class', function () {
            var cls = Rec(data);
            var rec = new cls();
            var re2 = rec.set("a", 2).set("b", 3).set("c", 4);
            expect(re2 instanceof cls).toBeTruthy();
            expect(re2).not.toBe(rec);
            expect(re2.a).toBe(2);
            expect(re2.b).toBe(3);
            expect(re2.c).toBe(4);
        });
    });
    describe('RecInvary with custom properties', function () {
        it('should get value by existing path in custom properties', function () {
            var cls = Rec(data);
            expect(new cls({ a: 2 }).get('a')).toBe(2);
        });
        it('should return default value by not existing path in custom properties', function () {
            var cls = Rec(data);
            expect(new cls({ a: 2 }).get('a.b.c', 2)).toBe(2);
        });
        it('should set new value by existing path in custom properties then return new instance of RecInvary class', function () {
            var cls = Rec(data);
            var rec = new cls({ a: 3 });
            var re2 = rec.set("a", 2);
            expect(re2 instanceof cls).toBeTruthy();
            expect(re2).not.toBe(rec);
            expect(re2.a).toBe(2);
        });
    });
}
test(rec_1.Rec);
test(rec_dev_mode_1.Rec);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjX2ludmFyeS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3BlYy9yZWNfaW52YXJ5LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBc0M7QUFDdEMsMkRBQXlEO0FBU3pELElBQU0sSUFBSSxHQUFHLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztBQUVoQyxjQUFjLEdBQXdDO0lBQ2xELFFBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDbEIsRUFBRSxDQUFDLCtCQUErQixFQUFFO1lBQ2hDLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0QixNQUFNLENBQUMsR0FBRyxZQUFZLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHFDQUFxQyxFQUFFO1lBQ3RDLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0QixNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsWUFBWSxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywyREFBMkQsRUFBRTtZQUM1RCxJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdEIsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRTtZQUMzQyxJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdEI7Z0JBQ0ksSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseUZBQXlGLEVBQUU7WUFDMUYsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsbUZBQW1GLEVBQUU7WUFDcEYsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXBELE1BQU0sQ0FBQyxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxrQ0FBa0MsRUFBRTtRQUN6QyxFQUFFLENBQUMsd0RBQXdELEVBQUU7WUFDekQsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXRCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx1RUFBdUUsRUFBRTtZQUN4RSxJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdEIsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx3R0FBd0csRUFBRTtZQUN6RyxJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUM1QixJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUU1QixNQUFNLENBQUMsR0FBRyxZQUFZLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsSUFBSSxDQUFDLFNBQUcsQ0FBQyxDQUFDO0FBQ1YsSUFBSSxDQUFDLGtCQUFNLENBQUMsQ0FBQyJ9