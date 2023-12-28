import {
    AlreadyPlacedShipError,
    AlreadyAttackedSpotError,
    CollapseError,
    NotEnoughSpotsError,
    WrongCoordsError,
} from "../errors";
import {
    Spot,
    type MatrixOf10x10,
    type PlacingOptions,
    type SpotWithShip,
} from "../types";
import { type Ship } from "./Ship";

export class Gameboard {
    readonly #grid: MatrixOf10x10<Spot | SpotWithShip>;
    readonly #placedShips: Ship[];

    constructor() {
        this.#grid = new Array<null>(10)
            .fill(null)
            .map(() => new Array<Spot>(10).fill(Spot.Empty)) as MatrixOf10x10<
            Spot | SpotWithShip
        >;
        this.#placedShips = [];
    }

    get grid(): MatrixOf10x10<Spot | SpotWithShip> {
        return this.#grid;
    }

    get placedShips(): readonly Ship[] {
        return this.#placedShips;
    }

    placeShip(
        options: PlacingOptions
    ):
        | undefined
        | WrongCoordsError
        | NotEnoughSpotsError
        | CollapseError
        | AlreadyPlacedShipError {
        const { row, col, dir, ship } = options;

        if (this.#placedShips.includes(ship)) {
            return new AlreadyPlacedShipError();
        }

        if (row < 0 || row > 9 || col < 0 || col > 9) {
            return new WrongCoordsError(row, col);
        }

        const areSpotsEnough =
            (dir === "horizontal" ? col : row) + ship.shipLength - 10 <= 0;

        if (!areSpotsEnough) {
            return new NotEnoughSpotsError(options);
        }

        if (dir === "horizontal") {
            for (let i = col; i < ship.shipLength + col; i++) {
                if (this.#grid[row][i] instanceof Object) {
                    return new CollapseError();
                }
            }

            for (let i = col; i < ship.shipLength + col; i++) {
                this.#grid[row][i] = {
                    spotStatus: Spot.Taken,
                    ship,
                };
            }
        } else {
            for (let i = row; i < ship.shipLength + row; i++) {
                if (this.#grid[i][col] instanceof Object) {
                    return new CollapseError();
                }
            }

            for (let i = row; i < ship.shipLength + row; i++) {
                this.#grid[i][col] = {
                    spotStatus: Spot.Taken,
                    ship,
                };
            }
        }

        this.#placedShips.push(ship);
    }

    receiveAttack(
        options: Pick<PlacingOptions, "row" | "col">
    ): undefined | WrongCoordsError | AlreadyAttackedSpotError {
        const { row, col } = options;

        if (row < 0 || row > 9 || col < 0 || col > 9) {
            return new WrongCoordsError(row, col);
        }

        const target = this.#grid[row][col];

        if (
            target === Spot.Missed ||
            (target instanceof Object && target.spotStatus === Spot.Damaged)
        ) {
            return new AlreadyAttackedSpotError(row, col);
        }

        if (target === Spot.Empty) {
            this.#grid[row][col] = Spot.Missed;

            return;
        }

        if (target instanceof Object) {
            target.ship.getHit();

            (this.#grid[row][col] as SpotWithShip).spotStatus = Spot.Damaged;
        }
    }

    areAllShipsSunk(): boolean {
        return this.#placedShips.find((ship) => ship.isSunk()) != null;
    }
}
