import { type PlacingOptions } from "./types";

export class WrongCoordsError extends Error {
    readonly name: string;
    readonly message: string;

    constructor(row: number, col: number) {
        super();
        this.name = "WrongCoordsError";
        this.message = `\
Wrong coordinates were specified:
row: ${row}
col: ${col}

Both values must be > 0 and < 9.
`;
    }
}

export class NotEnoughSpotsError extends Error {
    readonly name: string;
    readonly message: string;

    constructor(options: PlacingOptions) {
        const leftNeededSpots = options.col + options.ship.shipLength - 10;

        super();
        this.name = "NotEnoughSpotsError";
        this.message = `\
Number of ${options.dir} spots is not enough to place the ship (Needs ${leftNeededSpots} more spots):
row: ${options.row}
col: ${options.col}
ship's length: ${options.ship.shipLength}
        `;
    }
}
