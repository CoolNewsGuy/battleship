import {
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

export class Gameboard {
    readonly #grid: MatrixOf10x10<Spot | SpotWithShip>;

    constructor() {
        this.#grid = new Array<null>(10)
            .fill(null)
            .map(() => new Array<Spot>(10).fill(Spot.Empty)) as MatrixOf10x10<
            Spot | SpotWithShip
        >;
    }

    get grid(): MatrixOf10x10<Spot | SpotWithShip> {
        return this.#grid;
    }

    placeShip(
        options: PlacingOptions
    ): undefined | WrongCoordsError | NotEnoughSpotsError | CollapseError {
        const { row, col, dir, ship } = options;

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
    }

    receiveAttack(
        options: Pick<PlacingOptions, "row" | "col">
    ): undefined | WrongCoordsError {
        const { row, col } = options;

        if (row < 0 || row > 9 || col < 0 || col > 9) {
            return new WrongCoordsError(row, col);
        }

        if (this.#grid[row][col] === Spot.Empty) {
            this.#grid[row][col] = Spot.Missed;
        }
    }
}
