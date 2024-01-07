import { AttackReceiverError, GameoverError } from "../errors";
import { AI } from "../scripts/AI";
import { Gameboard } from "../scripts/Gameboard";

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
    });
});
