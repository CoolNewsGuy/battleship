import { NotEnoughSpotsError, WrongCoordsError } from "../errors";
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
    ): undefined | WrongCoordsError | NotEnoughSpotsError {
        const { row, col, dir } = options;

        if (row < 0 || row > 9 || col < 0 || col > 9) {
            return new WrongCoordsError(row, col);
        }

        if (dir === "horizontal") {
            const areSpotsEnough =
                options.col + options.ship.shipLength - 10 <= 0;

            if (!areSpotsEnough) {
                return new NotEnoughSpotsError(options);
            }
        }
    }
}
