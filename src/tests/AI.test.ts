import { AttackReceiverError, GameoverError } from "../errors";
import { AI } from "../scripts/AI";
import { GameboardModel } from "../scripts/Gameboard/GameboardModel";
import { Player } from "../scripts/Player";
import { Ship } from "../scripts/Ship";
import { Spot, type SpotWithShip } from "../types";

describe("AI Class", () => {
    it("has 'name' property", () => {
        const ai = new AI("bar");

        expect(ai.name).toBe("bar");
    });

    describe("overrided attack method", () => {
        it("returns an error if the receiver is an invalid target", () => {
            const ai = new AI("bar");

            expect(
                ai.attack({
                    receiver: ai,
                })
            ).toBeInstanceOf(AttackReceiverError);

            expect(ai.board.grid).toStrictEqual(new GameboardModel().grid);
        });

        it("returns an error if all receiver's ships are sunk", () => {
            const ai = new AI("bar");
            const p = new Player("foo");

            expect(p.board.areAllShipsSunk()).toBe(true);

            expect(
                ai.attack({
                    receiver: p,
                })
            ).toBeInstanceOf(GameoverError);

            expect(p.board.grid).toStrictEqual(new GameboardModel().grid);
        });

        it("attacks a random spot", () => {
            const ai = new AI("bar");
            const p = new Player("foo");
            const ship = new Ship(2);

            p.board.placeShip({
                ship,
                row: 3,
                col: 2,
                dir: "horizontal",
            });

            for (let _ = 0; _ < 100; _++) {
                ai.attack({ receiver: p });
            }

            expect(p.board.grid[3][2]).toStrictEqual<SpotWithShip>({
                ship,
                spotStatus: Spot.Damaged,
            });

            expect(p.board.grid[3][3]).toStrictEqual<SpotWithShip>({
                ship,
                spotStatus: Spot.Damaged,
            });
        });
    });
});
