import { AttackReceiverError, GameoverError } from "../errors";
import { AI } from "../scripts/AI";
import { Gameboard } from "../scripts/Gameboard";
import { Player } from "../scripts/Player";

describe("AI Class", () => {
    it("has its 'name' prop === 'AI' by default", () => {
        const ai = new AI();

        expect(ai.name).toBe("AI");
    });

    describe("overrided attack method", () => {
        it("returns an error if the receiver is an invalid target", () => {
            const ai = new AI();

            expect(
                ai.attack({
                    receiver: ai,
                })
            ).toBeInstanceOf(AttackReceiverError);

            expect(ai.board.grid).toStrictEqual(new Gameboard().grid);
        });

        it("returns an error if all receiver's ships are sunk", () => {
            const ai = new AI();
            const p = new Player("foo");

            expect(p.board.areAllShipsSunk()).toBe(true);

            expect(
                ai.attack({
                    receiver: p,
                })
            ).toBeInstanceOf(GameoverError);

            expect(p.board.grid).toStrictEqual(new Gameboard().grid);
        });
    });
});
