import { AttackReceiverError, WrongCoordsError } from "../errors";
import { Gameboard } from "../scripts/Gameboard";
import { Player } from "../scripts/Player";
import { Spot } from "../types";

describe("Player class", () => {
    it("has readonly 'name' and 'board' pub props", () => {
        const p = new Player("John");

        expect(p.name).toBe("John");
        expect(p.board).toStrictEqual(new Gameboard());
    });

    describe("attack method", () => {
        it("returns an error if wrong coords were specified", () => {
            const p1 = new Player("foo");
            const p2 = new Player("bar");

            expect(
                p1.attack({
                    player: p2,
                    row: 5,
                    col: 10,
                })
            ).toBeInstanceOf(WrongCoordsError);

            expect(
                p1.attack({
                    player: p2,
                    row: 10,
                    col: -9,
                })
            ).toBeInstanceOf(WrongCoordsError);

            [p1, p2].forEach((p) => {
                expect(p.board).toStrictEqual(new Gameboard());
            });
        });

        it("returns an error if the target is the attacker themeselves", () => {
            const p1 = new Player("foo");

            expect(
                p1.attack({
                    player: p1,
                    row: 3,
                    col: 5,
                })
            ).toBeInstanceOf(AttackReceiverError);

            expect(p1.board.grid[3][5]).toStrictEqual(Spot.Empty);
        });
    });
});
