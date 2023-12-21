import { WrongCoordsError } from "../errors";
import { Spot, type MatrixOf10x10, type PlacingOptions } from "../types";

export class Gameboard {
    readonly #grid: MatrixOf10x10<Spot>;

    constructor() {
        this.#grid = new Array<null>(10)
            .fill(null)
            .map(() =>
                new Array<Spot>(10).fill(Spot.Empty)
            ) as MatrixOf10x10<Spot>;
    }

    get grid(): MatrixOf10x10<Spot> {
        return this.#grid;
    }

    placeShip(options: PlacingOptions): undefined | WrongCoordsError {
        const { row, col } = options;

        if (row < 0 || row > 9 || col < 0 || col > 9) {
            return new WrongCoordsError(row, col);
        }
    }
}
