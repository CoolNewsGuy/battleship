import { Spot, type MatrixOf10x10 } from "../types";

export class Gameboard {
    #grid: MatrixOf10x10<Spot>;

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
}
