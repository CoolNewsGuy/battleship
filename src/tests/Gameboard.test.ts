import { WrongCoordsError } from "../errors";
import { Gameboard } from "../scripts/Gameboard";

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

            expect(board.placeShip(10, 9)).toBeInstanceOf(WrongCoordsError);
            expect(board.placeShip(0, 92)).toBeInstanceOf(WrongCoordsError);
            expect(board.placeShip(5, 9)).not.toBeInstanceOf(WrongCoordsError);
            expect(board.placeShip(9, 9)).not.toBeInstanceOf(WrongCoordsError);
            expect(board.placeShip(0, 0)).not.toBeInstanceOf(WrongCoordsError);
        });
    });
});
