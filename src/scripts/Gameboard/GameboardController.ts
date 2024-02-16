import { type MatrixOf10x10, type Spot, type SpotWithShip } from "../../types";
import { type Ship } from "../Ship";
import { GameboardModel } from "./GameboardModel";
import { GameboardView } from "./GameboardView";

export class GameboardController {
    private readonly gameboardModel: GameboardModel;
    private readonly gameboardView: GameboardView;

    constructor() {
        this.gameboardView = new GameboardView();
        this.gameboardModel = new GameboardModel();
    }

    get grid(): MatrixOf10x10<Spot | SpotWithShip> {
        return this.gameboardModel.grid;
    }

    get placedShips(): readonly Ship[] {
        return this.gameboardModel.placedShips;
    }

    renderTo(element: HTMLElement): void {
        this.gameboardView.renderTo(element, this.grid, this.placedShips);
    }
}
