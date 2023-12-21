import { WrongCoordsError } from "../errors";
import { Gameboard } from "../scripts/Gameboard";
import { Ship } from "../scripts/Ship";
import { PlacingOptions } from "../types";

describe("Gameboard Class", () => {
    it("has no pub props", () => {
        const board = new Gameboard();

        expect(Object.keys(board)).toHaveLength(0);
    });

    it("has a getter for a private prop 'grid' of 10x10 matrix value", () => {
        const board = new Gameboard();

        expect(board.grid).toHaveLength(10);

        for (const row of board.grid) {
            expect(row).toHaveLength(10);
        }
    });

    describe("placeShip method", () => {
        it("returns an error if the provided coordinates are out of board", () => {
            const board = new Gameboard();
            const ship = new Ship(3);
            const coordsPairs: Array<[number, number]> = [
                [10, 9],
                [0, 92],
                [5, 9],
                [9, 9],
                [0, 0],
            ];

            for (let i = 0; i < coordsPairs.length; i++) {
                if (i < 2) {
                    expect(
                        board.placeShip({
                            ship,
                            row: coordsPairs[i][0],
                            col: coordsPairs[i][1],
                        })
                    ).toBeInstanceOf(WrongCoordsError);

                    continue;
                }

                expect(
                    board.placeShip({
                        ship,
                        row: coordsPairs[i][0],
                        col: coordsPairs[i][1],
                    })
                ).not.toBeInstanceOf(WrongCoordsError);
            }
        });
    });
});
