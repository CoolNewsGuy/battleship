import { Gameboard } from "./Gameboard";

export class Player {
    readonly name: string;
    readonly board: Gameboard;

    constructor(name: string) {
        this.name = name;
        this.board = new Gameboard();
    }
}
