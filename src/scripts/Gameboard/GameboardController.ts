import { type GameboardModel } from "./Gameboard";
import { type GameboardView } from "./GameboardView";

export class GameboardController {
    private readonly gameboardModel: GameboardModel;
    private readonly gameboardView: GameboardView;

    constructor(gameboardView: GameboardView, gameboardModel: GameboardModel) {
        this.gameboardView = gameboardView;
        this.gameboardModel = gameboardModel;
    }
}
