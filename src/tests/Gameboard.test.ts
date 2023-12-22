import {
    CollapseError,
    NotEnoughSpotsError,
    WrongCoordsError,
} from "../errors";
import { Gameboard } from "../scripts/Gameboard";
import { Ship } from "../scripts/Ship";
import { Spot, type SpotWithShip } from "../types";

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
                            dir: "horizontal",
                        })
                    ).toBeInstanceOf(WrongCoordsError);

                    continue;
                }

                expect(
                    board.placeShip({
                        ship,
                        row: coordsPairs[i][0],
                        col: coordsPairs[i][1],
                        dir: "horizontal",
                    })
                ).not.toBeInstanceOf(WrongCoordsError);
            }
        });

        it("returns an error if number of horizontal spots is NOT enough for a ship", () => {
            const board = new Gameboard();
            const ships = [new Ship(3), new Ship(4), new Ship(5)];
            const coordsPairs: Array<[number, number]> = [
                [0, 9],
                [3, 7],
                [8, 3],
            ];

            for (let i = 0; i < 2; i++) {
                expect(
                    board.placeShip({
                        row: coordsPairs[i][0],
                        col: coordsPairs[i][1],
                        ship: ships[i],
                        dir: "horizontal",
                    })
                ).toBeInstanceOf(NotEnoughSpotsError);
            }
            expect(
                board.placeShip({
                    row: coordsPairs[2][0],
                    col: coordsPairs[2][1],
                    ship: ships[2],
                    dir: "horizontal",
                })
            ).not.toBeInstanceOf(NotEnoughSpotsError);
        });

        it("returns an error if number of vertical spots is NOT enough for a ship", () => {
            const board = new Gameboard();
            const ships = [new Ship(3), new Ship(4), new Ship(5)];
            const coordsPairs: Array<[number, number]> = [
                [0, 9],
                [3, 7],
                [8, 3],
            ];

            for (let i = 0; i < 2; i++) {
                expect(
                    board.placeShip({
                        row: coordsPairs[i][0],
                        col: coordsPairs[i][1],
                        ship: ships[i],
                        dir: "vertical",
                    })
                ).not.toBeInstanceOf(NotEnoughSpotsError);
            }
            expect(
                board.placeShip({
                    row: coordsPairs[2][0],
                    col: coordsPairs[2][1],
                    ship: ships[2],
                    dir: "vertical",
                })
            ).toBeInstanceOf(NotEnoughSpotsError);
        });

        it("places ships horizontally properly", () => {
            const board = new Gameboard();
            const ships = [
                new Ship(2),
                new Ship(2),
                new Ship(3),
                new Ship(4),
                new Ship(5),
            ];
            const coordsPairs: Array<[number, number]> = [
                [1, 3],
                [6, 1],
                [9, 7],
                [0, 2],
                [3, 5],
            ];

            for (let i = 0; i < ships.length; i++) {
                const row = coordsPairs[i][0];
                const col = coordsPairs[i][1];

                board.placeShip({
                    row,
                    col,
                    ship: ships[i],
                    dir: "horizontal",
                });

                // check if board.grid changed
                for (let j = col; j < ships[i].shipLength + col; j++) {
                    expect(board.grid[row][j]).toStrictEqual<SpotWithShip>({
                        ship: ships[i],
                        spotStatus: Spot.Taken,
                    });
                }
            }
        });

        it("places ships vertically properly", () => {
            const board = new Gameboard();
            const ships = [
                new Ship(2),
                new Ship(2),
                new Ship(3),
                new Ship(4),
                new Ship(5),
            ];
            const coordsPairs: Array<[number, number]> = [
                [1, 3],
                [6, 1],
                [7, 7],
                [3, 2],
                [3, 5],
            ];

            for (let i = 0; i < ships.length; i++) {
                const row = coordsPairs[i][0];
                const col = coordsPairs[i][1];

                board.placeShip({
                    row,
                    col,
                    ship: ships[i],
                    dir: "vertical",
                });

                // check if board.grid changed
                for (let j = row; j < ships[i].shipLength + row; j++) {
                    expect(board.grid[j][col]).toStrictEqual<SpotWithShip>({
                        ship: ships[i],
                        spotStatus: Spot.Taken,
                    });
                }
            }
        });

        it("returns an error if the ship collapses with another one", () => {
            const board = new Gameboard();
            const ships = [new Ship(2), new Ship(3), new Ship(4), new Ship(5)];
            const coordsPairs: Array<[number, number]> = [
                [1, 5],
                [1, 3],
                [3, 4],
                [5, 4],
            ];

            expect(
                board.placeShip({
                    ship: ships[0],
                    row: coordsPairs[0][0],
                    col: coordsPairs[0][1],
                    dir: "horizontal",
                })
            ).not.toBeInstanceOf(Error);

            expect(
                board.placeShip({
                    ship: ships[1],
                    row: coordsPairs[1][0],
                    col: coordsPairs[1][1],
                    dir: "horizontal",
                })
            ).toBeInstanceOf(CollapseError);

            expect([
                board.grid[coordsPairs[1][0]][coordsPairs[1][1]],
                board.grid[coordsPairs[1][0]][coordsPairs[1][1] + 1],
                board.grid[coordsPairs[1][0]][coordsPairs[1][1] + 2],
            ]).toStrictEqual<Array<Spot | SpotWithShip>>([
                Spot.Empty,
                Spot.Empty,
                { ship: ships[0], spotStatus: Spot.Taken },
            ]);

            expect(
                board.placeShip({
                    ship: ships[2],
                    row: coordsPairs[2][0],
                    col: coordsPairs[2][1],
                    dir: "vertical",
                })
            ).not.toBeInstanceOf(Error);

            expect(
                board.placeShip({
                    ship: ships[3],
                    row: coordsPairs[3][0],
                    col: coordsPairs[3][1],
                    dir: "vertical",
                })
            ).toBeInstanceOf(CollapseError);

            expect([
                board.grid[coordsPairs[3][0]][coordsPairs[3][1]],
                board.grid[coordsPairs[3][0] + 1][coordsPairs[3][1]],
                board.grid[coordsPairs[3][0] + 2][coordsPairs[3][1]],
                board.grid[coordsPairs[3][0] + 3][coordsPairs[3][1]],
                board.grid[coordsPairs[3][0] + 4][coordsPairs[3][1]],
            ]).toStrictEqual<Array<Spot | SpotWithShip>>([
                { ship: ships[2], spotStatus: Spot.Taken },
                { ship: ships[2], spotStatus: Spot.Taken },
                Spot.Empty,
                Spot.Empty,
                Spot.Empty,
            ]);
        });
    });
});
