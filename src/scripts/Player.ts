import { AttackReceiverError, type AlreadyAttackedSpotError } from "../errors";
import { type AttackOptions } from "../types";
import { Gameboard } from "./Gameboard";

export class Player {
    readonly name: string;
    readonly board: Gameboard;

    constructor(name: string) {
        this.name = name;
        this.board = new Gameboard();
    }

    attack(
        options: AttackOptions
    ): undefined | AttackReceiverError | AlreadyAttackedSpotError {
        const { receiver } = options;

        if (receiver === this) {
            return new AttackReceiverError();
        }

        return receiver.board.receiveAttack(options);
    }
}
