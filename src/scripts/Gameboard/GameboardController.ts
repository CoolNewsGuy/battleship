import { type MatrixOf10x10, type Spot, type SpotWithShip } from "../../types";
import { type GameboardModel } from "./Gameboard";
import { type GameboardView } from "./GameboardView";

export class GameboardController {
    private readonly gameboardModel: GameboardModel;
    private readonly gameboardView: GameboardView;

    constructor(gameboardView: GameboardView, gameboardModel: GameboardModel) {
        this.gameboardView = gameboardView;
        this.gameboardModel = gameboardModel;
    }

    get grid(): MatrixOf10x10<Spot | SpotWithShip> {
        return this.gameboardModel.grid;
    }
}
