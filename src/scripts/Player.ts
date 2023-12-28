import { AttackReceiverError, WrongCoordsError } from "../errors";
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
    ): undefined | WrongCoordsError | AttackReceiverError {
        const { row, col, receiver } = options;

        if (receiver === this) {
            return new AttackReceiverError();
        }

        if (row < 0 || row > 9 || col < 0 || col > 9) {
            return new WrongCoordsError(row, col);
        }

        return receiver.board.receiveAttack(options);
    }
}
