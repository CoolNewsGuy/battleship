import { Ship } from "../scripts/Ship";

describe("Ship Class", () => {
    it("creates an object with readonly 'shipsLength' as the only pub prop", () => {
        const a = new Ship(3);

        expect(a.shipLength).toBe(3);
        expect(Object.keys(a)).toHaveLength(1);
    });

    it("has a getter for 'receivedHits', which is a private prop", () => {
        const a = new Ship(3);

        expect(a.receivedHits()).toBe(0);
        expect(Object.keys(a)).toHaveLength(1);
    });
});
