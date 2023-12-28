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
        const leftNeededSpots =
            (options.dir === "horizontal" ? options.col : options.row) +
            options.ship.shipLength -
            10;

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

export class CollapseError extends Error {
    readonly name: string;
    readonly message: string;

    constructor() {
        super();
        this.name = "CollapseError";
        this.message =
            "The target ship collapses with another already placed one.";
    }
}

export class AlreadyAttackedSpotError extends Error {
    readonly name: string;
    readonly message: string;

    constructor(row: number, col: number) {
        super();
        this.name = "AttackTargetError";
        this.message = `\
The attack target is already damaged or missed.
row: ${row}
col: ${col}

Consider different coords.
`;
    }
}

export class AlreadyPlacedShipError extends Error {
    readonly name: string;
    readonly message: string;

    constructor() {
        super();
        this.name = "AlreadyPlacedShipError";
        this.message =
            "The specified Ship object is already placed on the board";
    }
}

export class AttackReceiverError extends Error {
    readonly name: string;
    readonly message: string;

    constructor() {
        super();
        this.name = "AttackReceiverError";
        this.message = "Attack receiver is an invalid target.";
    }
}
