
import {Map} from "../src/compromise/map";

describe('Map', () => {
    it('', () => {
        const map = Map();
        const m_2 = map.set('a', 1);
        const m_3 = m_2.set('a', 1);
        const m_4 = m_2.set('b', 2);

        expect(map.get('a')).toBe(void 0);
        expect(m_2.get('a')).toBe(1);
        expect(m_4.get('b')).toBe(2);
        expect(m_2).toNotBe(map);
        expect(m_3).toBe(m_2);
        expect(m_4).toNotBe(m_2);

        const k = [];

        const sz = 1000000;

        for (let i = 0; i < sz; i ++) {
            k.push(i.toString());
        }

        let mmm = Map();

        console.time("set");
        for (let i = 0; i < sz; i ++) {
            mmm = mmm.set(k[i], i);
        }
        console.timeEnd("set");

        console.time("get");
        for (let i = 0; i < sz; i ++) {
            mmm.get(k[i]);
        }
        console.timeEnd("get");

        for (let i = 0; i < sz; i ++) {
        //    expect(mmm.get(k[i])).toBe(i);
        }
    });
});
