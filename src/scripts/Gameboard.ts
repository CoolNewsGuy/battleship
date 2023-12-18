import { type Spot, type MatrixOf10x10 } from "../types";

export class Gameboard {
    #grid: MatrixOf10x10<Spot>;

    get grid(): MatrixOf10x10<Spot> {
        return this.#grid;
    }
}
