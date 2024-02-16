import { HTMLClass } from "../../DOMTypes";

export class GameboardView {
    private readonly gameboardElement: HTMLDivElement;

    constructor() {
        this.gameboardElement = document.createElement("div");
        this.gameboardElement.className = HTMLClass.Gameboard;
    }

    init(): void {
        this.renderTo(document.body);
    }

    private renderTo(element: HTMLElement): void {}
}
