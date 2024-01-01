import {
    AttackReceiverError,
    AlreadyAttackedSpotError,
    GameoverError,
} from "../errors";
import { Gameboard } from "../scripts/Gameboard";
import { Player } from "../scripts/Player";
import { Ship } from "../scripts/Ship";
import { Spot, type SpotWithShip } from "../types";

describe("Player class", () => {
    it("has readonly 'name' and 'board' pub props", () => {
        const p = new Player("John");

        expect(p.name).toBe("John");
        expect(p.board).toStrictEqual(new Gameboard());
    });

    describe("attack method", () => {
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

            p2.board.placeShip({
                ship: new Ship(2),
                row: 0,
                col: 0,
                dir: "horizontal",
            });

            p1.attack({ receiver: p2, row: 5, col: 6 });
            p1.attack({ receiver: p2, row: 3, col: 8 });
            p1.attack({ receiver: p2, row: 1, col: 2 });

            expect([
                p2.board.grid[5][6],
                p2.board.grid[3][8],
                p2.board.grid[1][2],
            ]).toStrictEqual([Spot.Missed, Spot.Missed, Spot.Missed]);
        });

        it("marks a taken spot as damaged", () => {
            const p1 = new Player("foo");
            const p2 = new Player("bar");
            const ships = [new Ship(3), new Ship(5)];

            p1.board.placeShip({
                ship: ships[0],
                row: 3,
                col: 5,
                dir: "horizontal",
            });

            p2.board.placeShip({
                ship: ships[1],
                row: 5,
                col: 4,
                dir: "vertical",
            });

            p1.attack({ receiver: p2, row: 7, col: 4 });
            p1.attack({ receiver: p2, row: 8, col: 4 });
            p2.attack({ receiver: p1, row: 3, col: 5 });
            p2.attack({ receiver: p1, row: 3, col: 6 });

            expect(p1.board.grid[3][5]).toMatchObject<SpotWithShip>({
                spotStatus: Spot.Damaged,
                ship: ships[0],
            });
            expect(p1.board.grid[3][6]).toMatchObject<SpotWithShip>({
                spotStatus: Spot.Damaged,
                ship: ships[0],
            });
            expect(p1.board.grid[3][7]).toMatchObject<SpotWithShip>({
                spotStatus: Spot.Taken,
                ship: ships[0],
            });

            expect(p2.board.grid[5][4]).toMatchObject<SpotWithShip>({
                spotStatus: Spot.Taken,
                ship: ships[1],
            });
            expect(p2.board.grid[6][4]).toMatchObject<SpotWithShip>({
                spotStatus: Spot.Taken,
                ship: ships[1],
            });
            expect(p2.board.grid[7][4]).toMatchObject<SpotWithShip>({
                spotStatus: Spot.Damaged,
                ship: ships[1],
            });
            expect(p2.board.grid[8][4]).toMatchObject<SpotWithShip>({
                spotStatus: Spot.Damaged,
                ship: ships[1],
            });
            expect(p2.board.grid[9][4]).toMatchObject<SpotWithShip>({
                spotStatus: Spot.Taken,
                ship: ships[1],
            });
        });

        it("returns an error if a spot is already damaged or missed", () => {
            const p1 = new Player("foo");
            const p2 = new Player("bar");
            const ship = new Ship(3);

            p2.board.placeShip({
                ship,
                row: 3,
                col: 2,
                dir: "horizontal",
            });

            expect(
                p1.attack({
                    receiver: p2,
                    row: 0,
                    col: 4,
                })
            ).not.toBeInstanceOf(AlreadyAttackedSpotError);
            expect(
                p1.attack({
                    receiver: p2,
                    row: 0,
                    col: 4,
                })
            ).toBeInstanceOf(AlreadyAttackedSpotError);
            expect(p2.board.grid[0][4]).toStrictEqual(Spot.Missed);

            expect(
                p1.attack({
                    receiver: p2,
                    row: 3,
                    col: 4,
                })
            ).not.toBeInstanceOf(AlreadyAttackedSpotError);
            expect(
                p1.attack({
                    receiver: p2,
                    row: 3,
                    col: 4,
                })
            ).toBeInstanceOf(AlreadyAttackedSpotError);
            expect(p2.board.grid[3][4]).toMatchObject<SpotWithShip>({
                ship,
                spotStatus: Spot.Damaged,
            });
            expect(ship.receivedHits).toBe(1);
        });

        it("increases ship's receivedHits", () => {
            const p1 = new Player("foo");
            const p2 = new Player("bar");
            const ship = new Ship(3);

            p2.board.placeShip({
                ship,
                row: 3,
                col: 5,
                dir: "horizontal",
            });

            expect(ship.receivedHits).toBe(0);
            expect(ship.isSunk()).toBe(false);

            p1.attack({ receiver: p2, row: 3, col: 5 });
            p1.attack({ receiver: p2, row: 3, col: 6 });

            expect(ship.receivedHits).toBe(2);
            expect(ship.isSunk()).toBe(false);

            p1.attack({ receiver: p2, row: 3, col: 7 });

            expect(ship.receivedHits).toBe(3);
            expect(ship.isSunk()).toBe(true);
        });

        it("returns an error if all ships are already sunk", () => {
            const p1 = new Player("foo");
            const p2 = new Player("bar");
            const ships = [new Ship(2), new Ship(3)];

            p2.board.placeShip({
                ship: ships[0],
                row: 9,
                col: 5,
                dir: "horizontal",
            });

            p2.board.placeShip({
                ship: ships[1],
                row: 7,
                col: 4,
                dir: "vertical",
            });

            expect(p2.board.areAllShipsSunk()).toBe(false);

            p1.attack({ row: 9, col: 5, receiver: p2 });
            p1.attack({ row: 9, col: 6, receiver: p2 });

            expect(p2.board.areAllShipsSunk()).toBe(false);
            expect(ships[0].isSunk()).toBe(true);

            p1.attack({ row: 7, col: 4, receiver: p2 });
            p1.attack({ row: 8, col: 4, receiver: p2 });
            p1.attack({ row: 9, col: 4, receiver: p2 });

            expect(p2.board.areAllShipsSunk()).toBe(true);

            expect(
                p1.attack({
                    row: 0,
                    col: 2,
                    receiver: p2,
                })
            ).toBeInstanceOf(GameoverError);
        });
    });
});
