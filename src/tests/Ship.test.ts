describe("Ship Class", () => {
    it("creates an object with readonly 'shipsLength' as the only pub prop", () => {
        const a = new Ship(3);

        expect(a.shipsLength).toBe(0);
        expect(Object.keys(a)).toHaveLength(1);
    });
});
