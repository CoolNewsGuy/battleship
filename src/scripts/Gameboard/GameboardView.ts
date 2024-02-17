import { HTMLClass, type RowLetter } from "../../DOMTypes";
import { type MatrixOf10x10, type Spot, type SpotWithShip } from "../../types";
import { Ship } from "../Ship";

export class GameboardView {
    private readonly gameboardElement: HTMLDivElement;
    private readonly shipsToPlace: Ship[];

    constructor() {
        this.gameboardElement = document.createElement("div");
        this.gameboardElement.className = HTMLClass.Gameboard;
        this.shipsToPlace = [
            new Ship(5),
            new Ship(4),
            new Ship(3),
            new Ship(2),
            new Ship(2),
        ];
    }

    renderTo(
        element: HTMLElement,
        grid: MatrixOf10x10<Spot | SpotWithShip>,
        placedShips: readonly Ship[]
    ): void {
        const lostShipsContainerDiv = document.createElement("div");
        const lostShipsLengthsDiv = document.createElement("div");

        lostShipsContainerDiv.className = HTMLClass.LostShipsContainer;
        lostShipsLengthsDiv.className = HTMLClass.LostShipsLengths;
        lostShipsLengthsDiv.textContent = `(${placedShips
            .filter((ship) => ship.isSunk())
            .join(", ")})`;

        lostShipsContainerDiv.innerHTML = `
        <p>
            Lost Ships' Lengths:
        ${lostShipsLengthsDiv.outerHTML}
        </p>
        `;

        const shipsContainerDiv = document.createElement("div");

        shipsContainerDiv.className = HTMLClass.ShipsContainer;

        const shipDiv = document.createElement("div");

        shipDiv.classList.add(HTMLClass.Ship, HTMLClass.NormalShip);
        shipsContainerDiv.appendChild(shipDiv);

        const ship = this.shipsToPlace.pop();

        if (ship != null) {
            for (let _ = 0; _ < ship.shipLength; _++) {
                const squareDiv = document.createElement("div");

                squareDiv.className = HTMLClass.Square;
                shipDiv.appendChild(squareDiv);
            }
        }

        const gridDiv = document.createElement("div");

        gridDiv.className = HTMLClass.Grid;

        for (let i = 0; i < 11; i++) {
            const rowDiv = document.createElement("div");

            rowDiv.className = HTMLClass.Row;

            // Columns' Numbers row
            if (i === 0) {
                rowDiv.classList.add(HTMLClass.ColumnsNumbers);

                for (let j = 0; j < 11; j++) {
                    const squareDiv = document.createElement("div");

                    squareDiv.className = HTMLClass.Square;

                    if (j === 0) {
                        squareDiv.classList.add(HTMLClass.EmptySquare);
                    } else {
                        squareDiv.classList.add(HTMLClass.ColumnNumber);
                        squareDiv.textContent = `${j}`;
                    }

                    rowDiv.appendChild(squareDiv);
                }
            } else {
                const rowLetters: RowLetter[] = [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H",
                    "I",
                    "J",
                ];

                for (let j = 0; j < 11; j++) {
                    const squareDiv = document.createElement("div");

                    squareDiv.className = HTMLClass.Square;

                    if (j === 0) {
                        squareDiv.classList.add(HTMLClass.RowLetter);
                        squareDiv.textContent = rowLetters[i - 1];
                    } else {
                        squareDiv.classList.add(HTMLClass.PlayingSquare);
                    }

                    rowDiv.appendChild(squareDiv);
                }
            }

            gridDiv.appendChild(rowDiv);
        }

        const PlayerNameContainerDiv = document.createElement("div");
        const PlayerNameSpan = document.createElement("span");

        PlayerNameContainerDiv.className = HTMLClass.PlayerNameContainer;
        PlayerNameSpan.className = HTMLClass.PlayerName;

        PlayerNameContainerDiv.appendChild(PlayerNameSpan);

        this.gameboardElement.append(
            lostShipsContainerDiv,
            shipsContainerDiv,
            gridDiv,
            PlayerNameContainerDiv
        );

        element.appendChild(this.gameboardElement);
    }
}
