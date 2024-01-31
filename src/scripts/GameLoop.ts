import { type AI } from "./AI";
import { type Player } from "./Player";

export class GameLoop {
    readonly #playerOne: Player | AI;
    readonly #playerTwo: Player | AI;

    constructor(playerOne: Player | AI, playerTwo: Player | AI) {
        this.#playerOne = playerOne;
        this.#playerTwo = playerTwo;
    }
}
