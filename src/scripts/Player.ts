import {
    AttackReceiverError,
    type AlreadyAttackedSpotError,
    type GameoverError,
} from "../errors";
import { type AttackOptions } from "../types";
import { GameboardModel } from "./Gameboard/GameboardModel";

export class Player {
    readonly name: string;
    readonly board: GameboardModel;

    constructor(name: string) {
        this.name = name;
        this.board = new GameboardModel();
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
