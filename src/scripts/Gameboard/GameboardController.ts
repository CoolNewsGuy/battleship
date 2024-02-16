import { type MatrixOf10x10, type Spot, type SpotWithShip } from "../../types";
import { type Ship } from "../Ship";
import { type GameboardModel } from "./GameboardModel";
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

    get placedShips(): readonly Ship[] {
        return this.gameboardModel.placedShips;
    }
}
