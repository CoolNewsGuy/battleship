import {
    AttackReceiverError,
    type AlreadyAttackedSpotError,
    type GameoverError,
} from "../errors";
import { type AttackOptions } from "../types";
import { Gameboard } from "./Gameboard/Gameboard";

export class Player {
    readonly name: string;
    readonly board: Gameboard;

    constructor(name: string) {
        this.name = name;
        this.board = new Gameboard();
    }

    attack(
        options: AttackOptions
    ):
        | undefined
        | AttackReceiverError
        | AlreadyAttackedSpotError
        | GameoverError {
        const { receiver } = options;

        if (receiver === this) {
            return new AttackReceiverError();
        }

        return receiver.board.receiveAttack(options);
    }
}
