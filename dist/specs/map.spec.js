(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../src/compromise/map"], factory);
    }
})(function (require, exports) {
    var map_1 = require("../src/compromise/map");
    describe('Map', function () {
        it('', function () {
            var map = map_1.Map();
            var m_2 = map.set('a', 1);
            var m_3 = m_2.set('a', 1);
            var m_4 = m_2.set('b', 2);
            expect(map.get('a')).toBe(void 0);
            expect(m_2.get('a')).toBe(1);
            expect(m_4.get('b')).toBe(2);
            expect(m_2).toNotBe(map);
            expect(m_3).toBe(m_2);
            expect(m_4).toNotBe(m_2);
            var k = [];
            var sz = 1000000;
            for (var i = 0; i < sz; i++) {
                k.push(i.toString());
            }
            var mmm = map_1.Map();
            console.time("set");
            for (var i = 0; i < sz; i++) {
                mmm = mmm.set(k[i], i);
            }
            console.timeEnd("set");
            console.time("get");
            for (var i = 0; i < sz; i++) {
                mmm.get(k[i]);
            }
            console.timeEnd("get");
            for (var i = 0; i < sz; i++) {
            }
        });
    });
});
