import {
    type WrongCoordsError,
    type AttackReceiverError,
    type AlreadyAttackedSpotError,
} from "../errors";
import { type AttackOptions } from "../types";
import { Player } from "./Player";

export class AI extends Player {
    constructor() {
        super("AI");
    }

    override attack(
        options: AttackOptions
    ):
        | WrongCoordsError
        | AttackReceiverError
        | AlreadyAttackedSpotError
        | undefined {}
}
