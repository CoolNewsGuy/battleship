import { Ship } from "../scripts/Ship";

describe("Ship Class", () => {
    it("creates an object with readonly 'shipsLength' as the only pub prop", () => {
        const a = new Ship(3);

        expect(a.shipLength).toBe(3);
        expect(Object.keys(a)).toHaveLength(1);
    });

    it("has a getter for 'receivedHits', which is a private prop", () => {
        const a = new Ship(3);

        expect(a.receivedHits).toBe(0);
        expect(Object.keys(a)).toHaveLength(1);
    });

    test("'receivedHits' is incremented when calling 'getHit' method", () => {
        const a = new Ship(3);

        expect(a.receivedHits).toBe(0);
        a.getHit();
        expect(a.receivedHits).toBe(1);
        a.getHit();
        a.getHit();
        expect(a.receivedHits).toBe(3);
    });

    test("'isSunk' method returns true if 'receivedHits' == 'shipLength'", () => {
        const a = new Ship(3);

        expect(a.isSunk()).toBeFalsy();
        a.getHit();
        a.getHit();
        expect(a.isSunk()).toBeFalsy();
        a.getHit();
        expect(a.isSunk()).toBeTruthy();
    });
});
