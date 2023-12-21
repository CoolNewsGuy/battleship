import { WrongCoordsError } from "../errors";
import { Gameboard } from "../scripts/Gameboard";
import { Ship } from "../scripts/Ship";

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

            expect(board.placeShip(ship, 10, 9)).toBeInstanceOf(
                WrongCoordsError
            );
            expect(board.placeShip(ship, 0, 92)).toBeInstanceOf(
                WrongCoordsError
            );
            expect(board.placeShip(ship, 5, 9)).not.toBeInstanceOf(
                WrongCoordsError
            );
            expect(board.placeShip(ship, 9, 9)).not.toBeInstanceOf(
                WrongCoordsError
            );
            expect(board.placeShip(ship, 0, 0)).not.toBeInstanceOf(
                WrongCoordsError
            );
        });
    });
});
