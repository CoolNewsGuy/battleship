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
                    receiver: p2,
                    row: 5,
                    col: 10,
                })
            ).toBeInstanceOf(WrongCoordsError);

            expect(
                p1.attack({
                    receiver: p2,
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
                    receiver: p1,
                    row: 3,
                    col: 5,
                })
            ).toBeInstanceOf(AttackReceiverError);

            expect(p1.board.grid[3][5]).toStrictEqual(Spot.Empty);
        });

        it("marks an empty spot as missed", () => {
            const p1 = new Player("foo");
            const p2 = new Player("bar");

            p1.attack({ receiver: p2, row: 5, col: 6 });
            p1.attack({ receiver: p2, row: 3, col: 8 });
            p1.attack({ receiver: p2, row: 1, col: 2 });

            expect([
                p2.board.grid[5][6],
                p2.board.grid[3][8],
                p2.board.grid[1][2],
            ]).toStrictEqual([Spot.Missed, Spot.Missed, Spot.Missed]);
        });
    });
});
