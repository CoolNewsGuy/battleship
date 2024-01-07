import { AttackReceiverError, GameoverError } from "../errors";
import { type AttackOptions } from "../types";
import { Player } from "./Player";

export class AI extends Player {
    constructor() {
        super("AI");
    }

    override attack(
        options: Pick<AttackOptions, "receiver">
    ): AttackReceiverError | GameoverError | undefined {
        const { receiver } = options;

        if (receiver === this) {
            return new AttackReceiverError();
        }

        if (receiver.board.areAllShipsSunk()) {
            return new GameoverError();
        }
    }
}
