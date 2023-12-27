import { Gameboard } from "../scripts/Gameboard";
import { Player } from "../scripts/Player";

describe("Player class", () => {
    it("has readonly 'name' and 'board' pub props", () => {
        const p = new Player("John");

        expect(p.name).toBe("John");
        expect(p.board).toStrictEqual(new Gameboard());
    });

    describe("attack method", () => {
        
    })
});
