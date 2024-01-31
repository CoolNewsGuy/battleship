import { AI } from "../scripts/AI";
import { Player } from "../scripts/Player";

describe("GameLoop class", () => {
    it("has no pub props", () => {
        const game = new GameLoop(new Player("foo"), new AI("bar"));

        expect(Object.keys(game)).toHaveLength(0);
    });
});
