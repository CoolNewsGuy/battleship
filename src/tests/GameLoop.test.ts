import { AI } from "../scripts/AI";
import { GameLoop } from "../scripts/GameLoop";
import { Player } from "../scripts/Player";

describe("GameLoop class", () => {
    it("has no pub props", () => {
        const game = new GameLoop(new Player("foo"), new AI("bar"));

        expect(Object.keys(game)).toHaveLength(0);
    });
});
