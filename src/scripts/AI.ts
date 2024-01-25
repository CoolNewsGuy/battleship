import { AttackReceiverError, GameoverError } from "../errors";
import {
    type NumFrom0To9,
    type AttackOptions,
    Spot,
    type SpotWithShip,
} from "../types";
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

        let randomRow: NumFrom0To9;
        let randomCol: NumFrom0To9;
        let target: Spot | SpotWithShip;

        do {
            randomRow = Math.floor(Math.random() * 10) as NumFrom0To9;
            randomCol = Math.floor(Math.random() * 10) as NumFrom0To9;
            target = receiver.board.grid[randomRow][randomCol];
        } while (
            target === Spot.Missed ||
            (target instanceof Object && target.spotStatus === Spot.Damaged)
        );

        receiver.board.receiveAttack({ row: randomRow, col: randomCol });
    }
}
